package com.priceTracker.Services;

import com.priceTracker.Entities.Product;
import com.priceTracker.Entities.ProductPriceHistory;
import com.priceTracker.Entities.UserTrackedProduct;
import com.priceTracker.Repositories.ProductHistoryRepository;
import com.priceTracker.Repositories.ProductRepository;
import com.priceTracker.Repositories.UserTrackedProductRepository;
import com.priceTracker.events.PriceDropEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.CacheManager;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class CheckPriceService {

    @Autowired
    private final ProductRepository productRepository;

    @Autowired
    private final ProductHistoryRepository historyRepository;

    @Autowired
    private final UserTrackedProductRepository trackedProductRepository;

    @Autowired
    private final EmailService emailService;

    @Autowired
    private final CacheManager cacheManager;

    @Autowired
    private final ApplicationEventPublisher eventPublisher;

    @Async
    @Transactional
    public void checkPrices() {

        List<Product> products = productRepository.findAll();


        for(Product product : products){

            BigDecimal oldPrice = product.getCurrentPrice();
            BigDecimal newPrice = fetchPrice(product.getProductUrl());

            if(newPrice == null) continue;

            if(oldPrice == null || oldPrice.compareTo(newPrice) != 0){
                product.setCurrentPrice(newPrice);
                product.setLastCheckedAt(LocalDateTime.now());
                productRepository.save(product);


                ProductPriceHistory history = new ProductPriceHistory();
                history.setProduct(product);
                history.setPrice(newPrice);
                history.setCheckedAt(LocalDateTime.now());

                historyRepository.save(history);

                //Notification part
                List<UserTrackedProduct> trackedProducts =
                            trackedProductRepository.findByProductIdWithUser(product.getId());

                for(UserTrackedProduct mapping : trackedProducts){

                    cacheManager.getCache("userTrackedProducts")
                            .evict(mapping.getUser().getId());

                    BigDecimal targetPrice = mapping.getTargetPrice();

                    if(newPrice.compareTo(targetPrice) <= 0 && !Boolean.TRUE.equals(mapping.getAlertSent())){

                        //function call for email send

                        System.out.println("Email Service triggered");

                        eventPublisher.publishEvent(
                                new PriceDropEvent(mapping , newPrice)
                        );

                        System.out.println("EVENT PUBLISHED");

                        mapping.setAlertSent(true);
                        trackedProductRepository.save(mapping);
                    }

                    if(newPrice.compareTo(targetPrice) > 0 && Boolean.TRUE.equals(mapping.getAlertSent())){

                        mapping.setAlertSent(false);
                        trackedProductRepository.save(mapping);
                    }
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
