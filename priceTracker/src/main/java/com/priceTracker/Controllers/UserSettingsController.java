package com.priceTracker.Controllers;

import com.priceTracker.DTOs.UserSettingsDTO;
import com.priceTracker.Entities.UserSettings;
import com.priceTracker.Services.UserSettingsService;
import com.priceTracker.payload.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/settings")
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

    @GetMapping("/{userId}")
    public ApiResponse<UserSettingsDTO> getSettings(@PathVariable Long userId) {

        UserSettingsDTO settings = service.getSettings(userId);
        return successResponse(settings, "Settings fetched successfully", HttpStatus.OK);
    }

    @PutMapping("/{userId}")
    public ApiResponse<String> updateSettings(@PathVariable Long userId, @RequestBody UserSettings settings) {

        service.updateSettings(userId, settings);
        return successResponse("Profile Updated","Settings Updated",HttpStatus.OK);
    }
}