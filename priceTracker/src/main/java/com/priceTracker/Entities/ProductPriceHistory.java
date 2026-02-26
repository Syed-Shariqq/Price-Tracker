package com.priceTracker.Entities;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "product_price_history"
       ,indexes = {
            @Index(name = "idx_product_checked", columnList = "product_id, checked_at")
} ,uniqueConstraints = @UniqueConstraint(
        columnNames = {"product_id", "price"}
) )
public class ProductPriceHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(name = "price", precision = 10, scale = 2, nullable = false)
    private BigDecimal price;

    @Column(name = "checked_at", nullable = false)
    private LocalDateTime checkedAt;
}