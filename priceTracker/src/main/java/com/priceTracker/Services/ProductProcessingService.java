package com.priceTracker.Services;

import com.priceTracker.Entities.Product;
import com.priceTracker.Entities.ProductPriceHistory;
import com.priceTracker.Entities.UserTrackedProduct;
import com.priceTracker.Repositories.ProductHistoryRepository;
import com.priceTracker.Repositories.ProductRepository;
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
    private ApplicationEventPublisher eventPublisher;

    @Transactional
    public void processProduct(Product product) {

        BigDecimal oldPrice = product.getCurrentPrice();
        BigDecimal newPrice = fetchPrice(product.getProductUrl());

        if (newPrice == null) return;

        if (oldPrice == null || oldPrice.compareTo(newPrice) != 0) {

            product.setCurrentPrice(newPrice);
            product.setLastCheckedAt(LocalDateTime.now());
            productRepository.save(product);

            ProductPriceHistory history = new ProductPriceHistory();
            history.setProduct(product);
            history.setPrice(newPrice);
            history.setCheckedAt(LocalDateTime.now());
            historyRepository.save(history);

            List<UserTrackedProduct> trackedProducts =
                    trackedProductRepository.findByProductIdWithUser(product.getId());

            for (UserTrackedProduct mapping : trackedProducts) {

                cacheManager.getCache("userTrackedProducts")
                        .evict(mapping.getUser().getId());

                BigDecimal targetPrice = mapping.getTargetPrice();

                if (newPrice.compareTo(targetPrice) <= 0 &&
                        !Boolean.TRUE.equals(mapping.getAlertSent())) {

                    eventPublisher.publishEvent(
                            new PriceDropEvent(
                                    mapping.getProduct().getProductName(),
                                    mapping.getUser().getEmail(),
                                    targetPrice
                                    , newPrice)
                    );

                    mapping.setAlertSent(true);
                    trackedProductRepository.save(mapping);
                }

                if (newPrice.compareTo(targetPrice) > 0 &&
                        Boolean.TRUE.equals(mapping.getAlertSent())) {

                    mapping.setAlertSent(false);
                    trackedProductRepository.save(mapping);
                }
            }
        }
    }


    public BigDecimal fetchPrice(String productUrl){
        try{

            Document document = Jsoup.connect(productUrl)
                    .userAgent("Mozilla/5.0")
                    .timeout(10000)
                    .get();

            Element priceElement = document.select(".price_color").first();

            if(priceElement == null) return null;

            String priceText = priceElement.text();

            String cleaned = priceText.replaceAll("[^0-9.]","");
            System.out.println(cleaned);

            return new BigDecimal(cleaned);

        }catch (Exception e){
            log.error(String.valueOf(e));
            return null;
        }
    }
}
