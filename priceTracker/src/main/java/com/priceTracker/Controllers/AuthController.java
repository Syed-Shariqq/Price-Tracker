package com.priceTracker.Controllers;


import com.priceTracker.DTOs.LoginRequest;
import com.priceTracker.DTOs.SignUpDto;
import com.priceTracker.Services.AuthService;
import com.priceTracker.payload.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;


@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    public <T> ApiResponse<T> successResponse(T data, String message, HttpStatus status){

        return ApiResponse.<T>builder()
                .message(message)
                .status(status.value())
                .data(data)
                .timeStamp(LocalDateTime.now())
                .build();
    }

    @PostMapping("/signup")
    public ApiResponse<String> signUp(@Valid @RequestBody SignUpDto signup){

        authService.userSignUp(signup);
        return successResponse("User Registered Successfully"
                ,"Verify Otp for Account Activation", HttpStatus.CREATED);

    }

    @PostMapping("/login")
    public ApiResponse<String> logIn(@RequestBody LoginRequest request){
            return successResponse(authService.userLogin(request)
                       , "Logged In Successfully", HttpStatus.OK);
    }
}
