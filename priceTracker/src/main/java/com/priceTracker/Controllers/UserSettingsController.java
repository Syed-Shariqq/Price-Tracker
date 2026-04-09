package com.priceTracker.Controllers;

import com.priceTracker.DTOs.UserSettingsDTO;
import com.priceTracker.Entities.User;
import com.priceTracker.Entities.UserSettings;
import com.priceTracker.Services.UserSettingsService;
import com.priceTracker.payload.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping({"/settings", "/api/settings"})
public class UserSettingsController {

    public <T> ApiResponse<T> successResponse(T data, String message, HttpStatus status){

        return ApiResponse.<T>builder()
                .timeStamp(LocalDateTime.now())
                .data(data)
                .status(status.value())
                .message(message)
                .build();
    }

    @Autowired
    private UserSettingsService service;

    @GetMapping
    public ApiResponse<UserSettingsDTO> getSettings(@AuthenticationPrincipal User user) {

        UserSettingsDTO settings = service.getSettings(user.getId());
        return successResponse(settings, "Settings fetched successfully", HttpStatus.OK);
    }

    @PutMapping
    public ApiResponse<String> updateSettings(@AuthenticationPrincipal User user, @RequestBody UserSettings settings) {

        service.updateSettings(user.getId(), settings);
        return successResponse("Profile Updated","Settings Updated",HttpStatus.OK);
    }

    @PostMapping("/fetch-now")
    public ApiResponse<String> fetchNow(@AuthenticationPrincipal User user) {
        service.fetchNow(user.getId());
        return successResponse("Price fetch triggered", "User product prices fetched successfully", HttpStatus.OK);
    }

    @DeleteMapping("/account")
    public ApiResponse<String> deleteAccount(@AuthenticationPrincipal User user) {
        service.deleteAccount(user.getId());
        return successResponse("Account deleted", "User account and related data deleted successfully", HttpStatus.OK);
    }
}
