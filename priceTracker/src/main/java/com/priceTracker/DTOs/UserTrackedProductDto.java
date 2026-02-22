package com.priceTracker.DTOs;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class UserTrackedProductDto {

    private String productUrl;

    private String productName;

    private BigDecimal currentPrice;

    private BigDecimal targetPrice;

    private Long id;

    private LocalDateTime lastCheckedAt;
}
