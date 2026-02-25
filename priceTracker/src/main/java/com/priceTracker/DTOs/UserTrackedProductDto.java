package com.priceTracker.DTOs;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserTrackedProductDto {

    private String productUrl;

    private String productName;

    private BigDecimal currentPrice;

    private BigDecimal targetPrice;

    private Long id;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime lastCheckedAt;
}
