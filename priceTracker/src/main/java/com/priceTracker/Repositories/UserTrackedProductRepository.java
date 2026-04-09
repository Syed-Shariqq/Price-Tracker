package com.priceTracker.Repositories;

import com.priceTracker.Entities.UserTrackedProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserTrackedProductRepository extends JpaRepository<UserTrackedProduct , Long> {

    Optional<UserTrackedProduct> findByUserIdAndProductId(Long userId, Long productId);

    List<UserTrackedProduct> findByUserId(Long userId);

    Optional<UserTrackedProduct> findByIdAndUserId(Long trackingId, Long userId);

    @Query("SELECT utp FROM UserTrackedProduct utp JOIN FETCH utp.user WHERE utp.product.id = :productId")
    List<UserTrackedProduct> findByProductIdWithUser(Long productId);

    @Query("""
    SELECT utp
    FROM UserTrackedProduct utp
    JOIN FETCH utp.user u
    WHERE utp.product.id = :productId
    AND (
        utp.alertSent = false
        OR utp.alertSent = true
    )
""")
    List<UserTrackedProduct> findActiveByProductId(@Param("productId") Long productId);

    @Query("""
        SELECT DISTINCT utp.product.id
        FROM UserTrackedProduct utp
        WHERE utp.user.id = :userId
    """)
    List<Long> findDistinctProductIdsByUserId(@Param("userId") Long userId);
}
