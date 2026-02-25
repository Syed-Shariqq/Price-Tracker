package com.priceTracker.DTOs;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResetPassDto {

    private String token;

    private String newPassword;
}
