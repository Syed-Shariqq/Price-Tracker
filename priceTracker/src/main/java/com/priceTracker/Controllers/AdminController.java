package com.priceTracker.Controllers;

import com.priceTracker.Services.CheckPriceService;
import com.priceTracker.Services.EmailService;
import com.priceTracker.Services.OtpService;
import com.priceTracker.payload.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    @Autowired
    private final CheckPriceService priceService;

    @Autowired
    private final EmailService emailService;

    public <T> ApiResponse<T> successResponse(T data, String message){

        return ApiResponse.<T>builder()
                .message(message)
                .status(HttpStatus.OK.value())
                .data(data)
                .timeStamp(LocalDateTime.now())
                .build();
    }

    @PostMapping("/check-prices")
    public ApiResponse<String> triggerPriceCheck() {

        priceService.checkPrices();

        return successResponse("Price check triggered manually","Success");
    }


    @PostMapping("/email")
    public ApiResponse<String> testEmail() {

        emailService.priceAlert(
                "syedshariq0824@gmail.com",
                "Test Product",
                new BigDecimal("35.00"),
                new BigDecimal("40.00")
        );

        return successResponse("Test email sent","Success");
    }

    @Autowired
    private OtpService service;


    @GetMapping
    public String redis(){

        return service.testRedis();
    }

     @GetMapping("/redis")
     public String redd(){
        return service.getKey();
     }


}