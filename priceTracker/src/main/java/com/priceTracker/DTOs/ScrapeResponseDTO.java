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
public class ScrapeResponseDTO {

    private BigDecimal price;

    private String imgUrl;

    private String description;

    private String title;

    private String website;

}
