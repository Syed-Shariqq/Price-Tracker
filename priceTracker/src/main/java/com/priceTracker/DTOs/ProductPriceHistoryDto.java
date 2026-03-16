package com.priceTracker.DTOs;

import com.priceTracker.Entities.Product;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductPriceHistoryDto {

    private BigDecimal price;

    private LocalDateTime recordedAt;

}
