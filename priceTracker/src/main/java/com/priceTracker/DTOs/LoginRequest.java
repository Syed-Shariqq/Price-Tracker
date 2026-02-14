package com.priceTracker.DTOs;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequest {

    private String emailOrUsername;
    private String password;

    public String getEmailOrUsername() {
        return emailOrUsername;
    }

    public String getPassword() {
        return password;
    }
}
