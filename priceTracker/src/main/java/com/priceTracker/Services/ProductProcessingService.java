package com.priceTracker.Services;

import com.priceTracker.DTOs.ScrapeResponseDTO;
import com.priceTracker.Entities.Alert;
import com.priceTracker.Entities.Product;
import com.priceTracker.Entities.ProductPriceHistory;
import com.priceTracker.Entities.UserTrackedProduct;
import com.priceTracker.Exceptions.InvalidUrlException;
import com.priceTracker.Exceptions.ProductNotFoundException;
import com.priceTracker.Repositories.AlertRepository;
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
    private ApplicationEventPublisher eventPublisher;

    @Transactional
    public void processProduct(Long productId) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFoundException("Product Not found"));

        BigDecimal oldPrice = product.getCurrentPrice();
        ScrapeResponseDTO newPrice = fetchPrice(product.getProductUrl());

        if (newPrice == null || newPrice.getPrice() == null ) return;

        product.setLastCheckedAt(LocalDateTime.now());
        productRepository.save(product);

        if (oldPrice == null || oldPrice.compareTo(newPrice.getPrice()) != 0) {

            product.setCurrentPrice(newPrice.getPrice());
            productRepository.save(product);

            ProductPriceHistory history = new ProductPriceHistory();
            history.setProduct(product);
            history.setPrice(newPrice.getPrice());
            history.setCheckedAt(LocalDateTime.now());
            historyRepository.save(history);

            List<UserTrackedProduct> trackedProducts =
                    trackedProductRepository.findByProductIdWithUser(product.getId());

            for (UserTrackedProduct mapping : trackedProducts) {

                cacheManager.getCache("userTrackedProducts")
                        .evict(mapping.getUser().getId());

                BigDecimal targetPrice = mapping.getTargetPrice();

                if (targetPrice.compareTo(newPrice.getPrice()) >= 0 &&
                        !Boolean.TRUE.equals(mapping.getAlertSent())) {

                    Alert alert = new Alert();
                    alert.setUserId(mapping.getUser().getId());
                    alert.setProductId(product.getId());
                    alert.setProductName(product.getProductName());
                    alert.setOldPrice(oldPrice);
                    alert.setImgUrl(product.getImgUrl());
                    alert.setNewPrice(newPrice.getPrice());
                    alert.setAlertType("PRICE_DROP");
                    alert.setDescription(product.getDescription());
                    alert.setCreatedAt(LocalDateTime.now());

                    alertRepository.save(alert);

                    eventPublisher.publishEvent(
                            new PriceDropEvent(
                                    mapping.getProduct().getProductName(),
                                    mapping.getUser().getEmail(),
                                    targetPrice
                                    , newPrice.getPrice())
                    );

                    mapping.setAlertSent(true);
                    trackedProductRepository.save(mapping);
                }

                if (targetPrice.compareTo(newPrice.getPrice()) < 0 &&
                        Boolean.TRUE.equals(mapping.getAlertSent())) {

                    mapping.setAlertSent(false);
                    trackedProductRepository.save(mapping);
                }
            }
        }
    }


    public ScrapeResponseDTO fetchPrice(String productUrl){

        validateUrl(productUrl);

        try{

            Document document = Jsoup.connect(productUrl)
                    .userAgent("Mozilla/5.0")
                    .timeout(10000)
                    .get();

            String title = document.select("div.product_main h1").text();
            String description = document.select("#product_description + p").text();
            String imgUrl = document.select(".item img").attr("abs:src");
            String website = URI.create(productUrl).getHost();

            Element priceElement = document.select(".price_color").first();

            if(priceElement == null) return null;

            String priceText = priceElement.text();

            String cleaned = priceText.replaceAll("[^0-9.]","");
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
                 website
            );

        }catch (Exception e){
            throw new InvalidUrlException("Enter a valid url");
        }
    }

    private void validateUrl(String url){
        try{
            URI uri = new URI(url);

            if(uri.getHost() == null){
                throw new InvalidUrlException("Invalid URL: Host missing");
            }

        }catch (Exception e){
            log.error("Error: ",e);
            throw new InvalidUrlException("Invalid URL provided.");
        }
    }
}
