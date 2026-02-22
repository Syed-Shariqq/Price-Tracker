package com.priceTracker.DTOs;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class AddProductDTO {

    private String productName;

    private String productUrl;

    private BigDecimal targetPrice;
}
