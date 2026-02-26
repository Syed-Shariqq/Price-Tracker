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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

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

    @Autowired
    private final ProductProcessingService productProcessingService;


    private final ExecutorService executor = Executors.newFixedThreadPool(8);


    @Scheduled(fixedRate = 10000)
    public void checkPrices() {

        int page = 0;
        int size = 50;
        Page<Product> productPage;

        do {
            Pageable pageable = PageRequest.of(page, size);
            productPage = productRepository.findAll(pageable);

            List<Product> products = productPage.getContent();

            List<Future<?>> futures = new ArrayList<>();

            // Submit tasks for this page
            for (Product product : products) {
                futures.add(
                        executor.submit(() -> productProcessingService.processProduct(product))
                );
            }

            for (Future<?> future : futures) {
                try {
                    future.get();
                } catch (Exception e) {
                    log.error("Thread error", e);
                }
            }

            page++;

        } while (productPage.hasNext());
    }

}
