package com.priceTracker.DTOs;

import lombok.Data;

@Data
public class UserProfileResponse {
    private String name;
    private String email;
    private String username;

}