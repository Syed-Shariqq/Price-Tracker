package com.priceTracker.Repositories;

import com.priceTracker.Entities.UserTrackedProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserTrackedProductRepository extends JpaRepository<UserTrackedProduct , Long> {

    Optional<UserTrackedProduct> findByUserIdAndProductId(Long userId, Long productId);

    List<UserTrackedProduct> findByUserId(Long userId);

    @Query("SELECT utp FROM UserTrackedProduct utp JOIN FETCH utp.user WHERE utp.product.id = :productId")
    List<UserTrackedProduct> findByProductIdWithUser(Long productId);
}
