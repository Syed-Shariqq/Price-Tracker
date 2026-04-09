package com.priceTracker.Services;

import com.priceTracker.DTOs.UserSettingsDTO;
import com.priceTracker.Entities.User;
import com.priceTracker.Entities.UserSettings;
import com.priceTracker.Exceptions.UserSettingsNotFoundException;
import com.priceTracker.Repositories.UserRepository;
import com.priceTracker.Repositories.UserSettingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserSettingsService {

    @Autowired
    private UserSettingsRepository repo;

    @Autowired
    private UserRepository userRepo;

    private UserSettingsDTO toDTO(UserSettings s) {
        UserSettingsDTO dto = new UserSettingsDTO();
        dto.setNotifyOnDrop(s.isNotifyOnDrop());
        dto.setNotifyOnIncrease(s.isNotifyOnIncrease());
        dto.setMinDropPercentage(s.getMinDropPercentage());
        dto.setNotificationMethod(s.getNotificationMethod());
        dto.setAutoFetch(s.isAutoFetch());
        dto.setFetchInterval(s.getFetchInterval());
        return dto;
    }

    public UserSettingsDTO getSettings(Long id) {
        UserSettings s = repo.findByUserId(id).orElse(null);
        return toDTO(s);
    }

    public UserSettings updateSettings(Long userId, UserSettings newSettings) {

        UserSettings existing = repo.findByUserId(userId)
                .orElseGet(() -> {

                    UserSettings s = new UserSettings();
                    User user = userRepo.findById(userId).orElseThrow(() ->
                                    new UserSettingsNotFoundException("User not found"));
                    s.setUser(user);
                    return s;
                });

        existing.setNotifyOnDrop(newSettings.isNotifyOnDrop());
        existing.setNotifyOnIncrease(newSettings.isNotifyOnIncrease());
        existing.setMinDropPercentage(newSettings.getMinDropPercentage());
        existing.setNotificationMethod(newSettings.getNotificationMethod());
        existing.setAutoFetch(newSettings.isAutoFetch());
        existing.setFetchInterval(newSettings.getFetchInterval());

        return repo.save(existing);
    }


}