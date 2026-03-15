package com.priceTracker.DTOs;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
public class AlertDto {

    private String productName;

    private BigDecimal oldPrice;

    private BigDecimal newPrice;

    private String alertType;

    private String description;

    private String imgUrl;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime createdAt;

}