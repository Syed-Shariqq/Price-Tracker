package com.priceTracker.Repositories;

import com.priceTracker.Entities.ProductPriceHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductHistoryRepository extends JpaRepository<ProductPriceHistory, Long> {

    List<ProductPriceHistory> findByProductIdOrderByCheckedAtAsc(Long productId);

    void deleteByProductIdIn(List<Long> productIds);
}
