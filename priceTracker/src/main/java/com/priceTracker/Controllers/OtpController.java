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

    @Autowired
    private OtpService otpService;

    public <T> ApiResponse<T> successResponse(T data, String message, HttpStatus status){

        return ApiResponse.<T>builder()
                .message(message)
                .status(status.value())
                .data(data)
                .timeStamp(LocalDateTime.now())
                .build();
    }

    @PostMapping("/verify-otp")
    public ApiResponse<String> verifyOtp(@RequestBody OtpRequest otpRequest){

        otpService.verifyOtp(otpRequest.getEmail(), otpRequest.getOtp());
        return successResponse("Email Verified Successfully",
                "Verification Successful", HttpStatus.OK);

    }

    @PostMapping("/send-otp")
    public ApiResponse<String> sendOtp(@RequestBody EmailRequest request){

        otpService.sendOtp(request.getEmail());
        return successResponse("Otp sent Successfully","Check OTP",HttpStatus.OK);

    }



                                      //Forgot Password Section//


    @PostMapping("/forgot-password")
    public ApiResponse<String> forgotPassword(@RequestBody ForgotPassDto forgotPassDto){

        otpService.forgotPassword(forgotPassDto.getEmail());
        return successResponse("Reset Link Sent"
                ,"Click the link to reset your password",HttpStatus.OK);
    }

    @PostMapping("/reset-password")
    public ApiResponse<String> resetPassword(@RequestBody ResetPassDto resetPass){

        otpService.resetPassword(resetPass.getEmail(), resetPass.getToken(), resetPass.getNewPassword());
        return successResponse("Password changed successfully"
                ,"Log In with new password", HttpStatus.OK);

    }

}
