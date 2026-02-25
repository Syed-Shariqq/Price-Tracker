package com.priceTracker.Controllers;

import com.priceTracker.DTOs.EmailRequest;
import com.priceTracker.DTOs.ForgotPassDto;
import com.priceTracker.DTOs.OtpRequest;
import com.priceTracker.DTOs.ResetPassDto;
import com.priceTracker.Services.OtpService;
import com.priceTracker.payload.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/otp")
public class OtpController {


    public <T> ApiResponse<T> successResponse(T data, String message, HttpStatus status){

        return ApiResponse.<T>builder()
                .message(message)
                .status(status.value())
                .data(data)
                .timeStamp(LocalDateTime.now())
                .build();
    }
    @Autowired
    private OtpService otpService;

    @PostMapping("/verify-otp")
    public ApiResponse<String> verifyOtp(@RequestBody OtpRequest otpRequest){

        ApiResponse<String> stringApiResponse = otpService.verifyOtp(otpRequest.getEmail(), otpRequest.getOtp());
        return successResponse(stringApiResponse.getData(),
                stringApiResponse.getMessage(), HttpStatus.valueOf(stringApiResponse.getStatus()));

    }

    @PostMapping("/send-otp")
    public ApiResponse<String> sendOtp(@RequestBody EmailRequest request){

        ApiResponse<String> response = otpService.sendOtp(request.getEmail());
        return successResponse(response.getData(),response.getMessage(), HttpStatus.valueOf(response.getStatus()));

    }



                                      //Forgot Password Section//


    @PostMapping("/forgot-password")
    public ApiResponse<String> forgotPassword(@RequestBody ForgotPassDto forgotPassDto){

        String response = otpService.forgotPassword(forgotPassDto.getEmail());
        return successResponse(response
                ,"Click the link to reset your password",HttpStatus.OK);
    }

    @PostMapping("/reset-password")
    public ApiResponse<String> resetPassword(@RequestBody ResetPassDto resetPass){

        otpService.resetPassword(resetPass.getToken(), resetPass.getNewPassword());
        return successResponse("Password changed successfully"
                ,"Log In with new password", HttpStatus.OK);

    }

}
