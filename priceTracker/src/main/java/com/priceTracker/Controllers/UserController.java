package com.priceTracker.Controllers;

import com.priceTracker.payload.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/user")
public class UserController {

    public <T> ApiResponse<T> successResponse(T data, String message, HttpStatus status){

        return ApiResponse.<T>builder()
                .timeStamp(LocalDateTime.now())
                .data(data)
                .status(status.value())
                .message(message)
                .build();
    }


    @GetMapping("/me")
    public ApiResponse<String> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return successResponse("Logged in as : " + authentication.getName(),"Success",HttpStatus.OK);
    }
}
