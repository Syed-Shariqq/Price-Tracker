package com.priceTracker.Controllers;

import com.priceTracker.DTOs.EmailRequest;
import com.priceTracker.DTOs.ForgotPassDto;
import com.priceTracker.DTOs.OtpRequest;
import com.priceTracker.DTOs.ResetPassDto;
import com.priceTracker.Services.OtpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/otp")
public class OtpController {

    @Autowired
    private OtpService otpService;

    @PostMapping("/verify-otp")
    public ResponseEntity<String> verifyOtp(@RequestBody OtpRequest otpRequest){

        otpService.verifyOtp(otpRequest.getEmail(), otpRequest.getOtp());
        return ResponseEntity.ok("Email Verified Succesfully");

    }

    @PostMapping("/send-otp")
    public ResponseEntity<String> sendOtp(@RequestBody EmailRequest request){

        otpService.sendOtp(request.getEmail());
        return ResponseEntity.ok("Otp sent Successfully");

    }



                                      //Forgot Password Section//


    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody ForgotPassDto forgotPassDto){

        otpService.forgotPassword(forgotPassDto.getEmail());
        return ResponseEntity.ok("Reset Link Sent ");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody ResetPassDto resetPass){

        otpService.resetPassword(resetPass.getEmail(), resetPass.getToken(), resetPass.getNewPassword());
        return ResponseEntity.ok("Password changed successfully");

    }

}
