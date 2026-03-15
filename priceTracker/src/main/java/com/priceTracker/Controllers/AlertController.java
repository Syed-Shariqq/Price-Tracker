package com.priceTracker.Controllers;

import com.priceTracker.DTOs.AlertDto;
import com.priceTracker.Entities.User;
import com.priceTracker.Services.AlertService;
import com.priceTracker.payload.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/alerts")
public class AlertController {

    @Autowired
    private AlertService alertService;

    public <T> ApiResponse<T> successResponse(T data, String message, HttpStatus status){

        return ApiResponse.<T>builder()
                .message(message)
                .status(status.value())
                .data(data)
                .timeStamp(LocalDateTime.now())
                .build();
    }

    @GetMapping
    public ApiResponse<List<AlertDto>> getAlerts(
            @AuthenticationPrincipal User user){

        return successResponse(
                alertService.getUserAlerts(user.getId()),
                "Alerts fetched successfully",
                HttpStatus.OK
        );
    }
}
