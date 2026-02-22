package com.priceTracker.Repositories;

import com.priceTracker.Entities.ProductPriceHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductHistoryRepository extends JpaRepository<ProductPriceHistory, Long> {

}
