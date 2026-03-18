package com.priceTracker.DTOs;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductDto {

    private Long id;

    private String productName;

    private String imgUrl;

    private String productUrl;

    private String description;

    private BigDecimal currentPrice;

    private BigDecimal lowestPrice;
}
