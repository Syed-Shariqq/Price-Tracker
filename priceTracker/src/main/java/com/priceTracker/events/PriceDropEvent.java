package com.priceTracker.events;


import com.priceTracker.Entities.UserTrackedProduct;
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

    private UserTrackedProduct userTrackedProduct;

    private BigDecimal newPrice;

}
