package com.priceTracker.events;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PriceDropEvent {

    private String productName;

    private String email;

    private BigDecimal targetPrice;

    private BigDecimal newPrice;

}
