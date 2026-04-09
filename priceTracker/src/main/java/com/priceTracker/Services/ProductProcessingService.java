package com.priceTracker.Services;

import com.priceTracker.DTOs.ScrapeResponseDTO;
import com.priceTracker.Entities.Alert;
import com.priceTracker.Entities.Product;
import com.priceTracker.Entities.ProductPriceHistory;
import com.priceTracker.Entities.UserSettings;
import com.priceTracker.Entities.UserTrackedProduct;
import com.priceTracker.Exceptions.InvalidUrlException;
import com.priceTracker.Exceptions.ProductNotFoundException;
import com.priceTracker.Repositories.AlertRepository;
import com.priceTracker.Repositories.ProductHistoryRepository;
import com.priceTracker.Repositories.ProductRepository;
import com.priceTracker.Repositories.UserSettingsRepository;
import com.priceTracker.Repositories.UserTrackedProductRepository;
import com.priceTracker.events.PriceDropEvent;
import lombok.extern.slf4j.Slf4j;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.CacheManager;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.net.URI;
import java.time.LocalDateTime;
import java.util.List;

@Service
@Slf4j
public class ProductProcessingService {

    @Autowired
    private UserTrackedProductRepository trackedProductRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductHistoryRepository historyRepository;

    @Autowired
    private CacheManager cacheManager;

    @Autowired
    private AlertRepository alertRepository;

    @Autowired
    private UserSettingsRepository userSettingsRepository;

    @Autowired
    private ApplicationEventPublisher eventPublisher;

    @Transactional
    public void processProduct(Long productId) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFoundException("Product Not found"));

        BigDecimal oldPrice = product.getCurrentPrice();
        ScrapeResponseDTO response = fetchPrice(product.getProductUrl());

        if (response == null || response.getPrice() == null)
            return;

        BigDecimal newPrice = response.getPrice();

        product.setLastCheckedAt(LocalDateTime.now());

        if (oldPrice != null && oldPrice.compareTo(newPrice) == 0) {
            productRepository.save(product);
            return;
        }

        BigDecimal changeAmount = (oldPrice != null)
                ? newPrice.subtract(oldPrice)
                : BigDecimal.ZERO;

        BigDecimal changePercent = (oldPrice != null && oldPrice.compareTo(BigDecimal.ZERO) != 0)
                ? changeAmount.divide(oldPrice, 4, RoundingMode.HALF_UP)
                        .multiply(BigDecimal.valueOf(100))
                : BigDecimal.ZERO;

        product.setCurrentPrice(newPrice);
        productRepository.save(product);

        ProductPriceHistory history = ProductPriceHistory.builder()
                .product(product)
                .price(newPrice)
                .oldPrice(oldPrice)
                .changeAmount(changeAmount)
                .changePercent(changePercent)
                .checkedAt(LocalDateTime.now())
                .build();

        historyRepository.save(history);

        List<UserTrackedProduct> trackedProducts = trackedProductRepository.findActiveByProductId(product.getId());

        for (UserTrackedProduct mapping : trackedProducts) {

            Long userId = mapping.getUser().getId();
            UserSettings settings = userSettingsRepository.findByUserId(userId).orElse(null);
            boolean notifyOnDrop = settings != null && settings.isNotifyOnDrop();
            boolean notifyOnIncrease = settings != null && settings.isNotifyOnIncrease();

            cacheManager.getCache("userTrackedProducts").evict(userId);

            BigDecimal targetPrice = mapping.getTargetPrice();

            boolean isPriceDrop = oldPrice != null && newPrice.compareTo(oldPrice) < 0;
            boolean isPriceIncrease = oldPrice != null && newPrice.compareTo(oldPrice) > 0;

            boolean isSignificantDrop = changePercent.abs().compareTo(BigDecimal.valueOf(1)) >= 0;

            boolean shouldTrigger = isPriceDrop && targetPrice.compareTo(newPrice) >= 0 && isSignificantDrop
                    && notifyOnDrop;

            if (shouldTrigger && !Boolean.TRUE.equals(mapping.getAlertSent())) {

                Alert alert = Alert.builder()
                        .userId(userId)
                        .productId(product.getId())
                        .productName(product.getProductName())
                        .oldPrice(oldPrice)
                        .newPrice(newPrice)
                        .imgUrl(product.getImgUrl())
                        .alertType("PRICE_DROP")
                        .description(product.getDescription())
                        .createdAt(LocalDateTime.now())
                        .build();

                alertRepository.save(alert);

                eventPublisher.publishEvent(
                        new PriceDropEvent(
                                product.getProductName(),
                                mapping.getUser().getEmail(),
                                targetPrice,
                                newPrice));

                mapping.setAlertSent(true);
            }

            if (isPriceIncrease && notifyOnIncrease) {
                Alert increaseAlert = Alert.builder()
                        .userId(userId)
                        .productId(product.getId())
                        .productName(product.getProductName())
                        .oldPrice(oldPrice)
                        .newPrice(newPrice)
                        .imgUrl(product.getImgUrl())
                        .alertType("PRICE_INCREASE")
                        .description(product.getDescription())
                        .createdAt(LocalDateTime.now())
                        .build();

                alertRepository.save(increaseAlert);
            }

            if (targetPrice.compareTo(newPrice) < 0 &&
                    Boolean.TRUE.equals(mapping.getAlertSent())) {

                mapping.setAlertSent(false);
            }
        }
    }

    public ScrapeResponseDTO fetchPrice(String productUrl) {

        validateUrl(productUrl);

        try {

            Document document = Jsoup.connect(productUrl)
                    .userAgent("Mozilla/5.0")
                    .timeout(10000)
                    .get();

            String title = document.select("div.product_main h1").text();
            String description = document.select("#product_description + p").text();
            String imgUrl = document.select(".item img").attr("abs:src");
            String website = URI.create(productUrl).getHost();

            Element priceElement = document.select(".price_color").first();

            if (priceElement == null)
                return null;

            String priceText = priceElement.text();

            String cleaned = priceText.replaceAll("[^0-9.]", "");
            BigDecimal price = new BigDecimal(cleaned);
            System.out.println(price);
            System.out.println(imgUrl);
            System.out.println(title);
            System.out.println(description);
            System.out.println(website);

            return new ScrapeResponseDTO(
                    price,
                    imgUrl,
                    description,
                    title,
                    website);

        } catch (Exception e) {
            throw new InvalidUrlException("Unable to connect to the website. Please try again later.");
        }
    }

    private void validateUrl(String url) {

        URI uri;

        try {
            uri = new URI(url.trim());
        } catch (Exception e) {
            log.error("URI parsing failed: {}", url, e);
            throw new InvalidUrlException("Invalid URL format.");
        }

        if (uri.getScheme() == null ||
                (!uri.getScheme().equals("http") && !uri.getScheme().equals("https"))) {
            throw new InvalidUrlException("URL must start with http or https.");
        }

        String host = uri.getHost();
        if (host == null || !host.contains(".")) {
            throw new InvalidUrlException("Enter a valid website link.");
        }
    }
}
