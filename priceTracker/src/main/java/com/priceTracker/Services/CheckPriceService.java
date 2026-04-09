package com.priceTracker.Services;

import com.priceTracker.Entities.Product;
import com.priceTracker.Repositories.ProductRepository;
import com.priceTracker.Repositories.UserTrackedProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

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
    private final ProductProcessingService productProcessingService;

    @Autowired
    private final UserTrackedProductRepository trackedProductRepository;

    private final ExecutorService executor = Executors.newFixedThreadPool(8);

    @Scheduled(fixedDelay = 360000)
    public void checkPrices() {

        int page = 0;
        int size = 50;
        Page<Product> productPage;

        do {
            Pageable pageable = PageRequest.of(page, size);
            productPage = productRepository.findAll(pageable);

            List<Long> productIds = productPage.getContent()
                    .stream()
                    .map(Product::getId)
                    .toList();

            processProductIds(productIds);
            page++;

        } while (productPage.hasNext());
    }

    public void fetchPricesForUser(Long userId) {
        List<Long> productIds = trackedProductRepository.findDistinctProductIdsByUserId(userId);
        processProductIds(productIds);
    }

    private void processProductIds(List<Long> productIds) {
        if (productIds == null || productIds.isEmpty()) {
            return;
        }

        List<Future<?>> futures = new ArrayList<>();

        for (Long productId : productIds) {
            futures.add(executor.submit(() -> productProcessingService.processProduct(productId)));
        }

        for (Future<?> future : futures) {
            try {
                future.get();
            } catch (Exception e) {
                log.error("Thread error", e);
            }
        }
    }
}
