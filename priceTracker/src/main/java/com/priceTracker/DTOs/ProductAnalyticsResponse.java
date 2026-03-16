package com.priceTracker.DTOs;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductAnalyticsResponse {

    private ProductDto product;

    private List<ProductPriceHistoryDto> priceHistory;
}
