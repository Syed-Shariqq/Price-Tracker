package com.priceTracker.Services;

import com.priceTracker.DTOs.UserSettingsDTO;
import com.priceTracker.Entities.User;
import com.priceTracker.Entities.UserSettings;
import com.priceTracker.Exceptions.UserSettingsNotFoundException;
import com.priceTracker.Repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class UserSettingsService {

    @Autowired
    private UserSettingsRepository repo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private UserTrackedProductRepository userTrackedProductRepository;

    @Autowired
    private ProductHistoryRepository productHistoryRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CacheManager cacheManager;

    @Autowired
    private AlertRepository alertRepository;

    @Autowired
    private CheckPriceService checkPriceService;

    private UserSettingsDTO toDTO(UserSettings s) {
        UserSettingsDTO dto = new UserSettingsDTO();
        dto.setNotifyOnDrop(s.isNotifyOnDrop());
        dto.setNotifyOnIncrease(s.isNotifyOnIncrease());
        dto.setMinDropPercentage(s.getMinDropPercentage());
        dto.setNotificationMethod(s.getNotificationMethod());
        dto.setAutoFetch(s.isAutoFetch());
        dto.setFetchInterval(s.getFetchInterval());
        dto.setLastFetch(s.getLastFetch() != null ? s.getLastFetch(): null);
        return dto;
    }

    public UserSettingsDTO getSettings(Long userId) {

        UserSettings settings = repo.findByUserId(userId)
                .orElseGet(() -> {
                    User user = userRepo.findById(userId)
                            .orElseThrow(() -> new RuntimeException("User not found"));

                    UserSettings newSettings = new UserSettings();
                    newSettings.setUser(user);

                    // defaults
                    newSettings.setNotifyOnDrop(true);
                    newSettings.setNotifyOnIncrease(true);
                    newSettings.setMinDropPercentage(10);
                    newSettings.setNotificationMethod("EMAIL");
                    newSettings.setAutoFetch(true);

                    return repo.save(newSettings);
                });

        return toDTO(settings);
    }

    public UserSettings updateSettings(Long userId, UserSettings newSettings) {

        UserSettings existing = repo.findByUserId(userId)
                .orElseGet(() -> {

                    UserSettings s = new UserSettings();
                    User user = userRepo.findById(userId)
                            .orElseThrow(() -> new UserSettingsNotFoundException("User not found"));
                    s.setUser(user);
                    return s;
                });

        existing.setNotifyOnDrop(newSettings.isNotifyOnDrop());
        existing.setNotifyOnIncrease(newSettings.isNotifyOnIncrease());
        existing.setMinDropPercentage(newSettings.getMinDropPercentage());
        existing.setNotificationMethod(newSettings.getNotificationMethod());
        existing.setAutoFetch(newSettings.isAutoFetch());
        existing.setFetchInterval(newSettings.getFetchInterval());
        existing.setLastFetch(newSettings.getLastFetch());

        return repo.save(existing);
    }

    public void fetchNow(Long userId) {

        UserSettings settings = repo.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Settings not found"));

        settings.setLastFetch(String.valueOf(LocalDateTime.now()));
        repo.save(settings);

        checkPriceService.fetchPricesForUser(userId);
    }

    @Transactional
    public void deleteAccount(Long userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new UserSettingsNotFoundException("User not found"));

        // 1. Delete alerts for this user
        alertRepository.deleteByUserId(userId);

        // 2. Get product IDs before deleting tracked products
        List<Long> productIds = userTrackedProductRepository.findDistinctProductIdsByUserId(userId);

        // 3. Delete user's tracked products
        userTrackedProductRepository.deleteByUserId(userId);

        // 4. Find orphaned products (no other users tracking them)
        List<Long> deletableProductIds = productIds.stream()
                .filter(productId -> userTrackedProductRepository.countByProductId(productId) == 0)
                .toList();

        // 5. Delete orphaned product history and products
        if (!deletableProductIds.isEmpty()) {
            productHistoryRepository.deleteByProductIdIn(deletableProductIds);
            productRepository.deleteAllById(deletableProductIds);
        }

        // 6. Delete user settings
        repo.deleteByUserId(userId);

        // 7. Delete user
        userRepo.delete(user);

        // 8. Evict cache
        Cache cache = cacheManager.getCache("userTrackedProducts");
        if (cache != null) {
            cache.evict(userId);
        }
    }
}
