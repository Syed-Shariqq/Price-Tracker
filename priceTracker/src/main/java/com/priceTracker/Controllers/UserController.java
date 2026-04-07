package com.priceTracker.Controllers;

import com.priceTracker.DTOs.ChangePassDto;
import com.priceTracker.DTOs.UpdateProfileDto;
import com.priceTracker.DTOs.UserProfileResponse;
import com.priceTracker.Entities.User;
import com.priceTracker.Services.UserServiceImpl;
import com.priceTracker.payload.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserServiceImpl userService;


    public <T> ApiResponse<T> successResponse(T data, String message, HttpStatus status){

        return ApiResponse.<T>builder()
                .timeStamp(LocalDateTime.now())
                .data(data)
                .status(status.value())
                .message(message)
                .build();
    }

    @PutMapping("/change-pass")
    public ApiResponse<String> changePass(@AuthenticationPrincipal User user,@Valid @RequestBody ChangePassDto req){

        return successResponse(userService.changePassword(user.getId(), req), "Password Changed Successfully",HttpStatus.OK);
    }


    @GetMapping("/me")
    public ApiResponse<String> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return successResponse("Logged in as : " + authentication.getName(),"Success",HttpStatus.OK);
    }

    @PutMapping("/profile")
    public ApiResponse<String> updateProfile(@AuthenticationPrincipal User user, @RequestBody UpdateProfileDto req) {
        
        User updatedUser = userService.updateProfile(user.getId(), req);
        return successResponse("Success", "Profile updated successfully", HttpStatus.OK);
    }

    @GetMapping("/profile")
    public ApiResponse<UserProfileResponse> getProfileDetails(@AuthenticationPrincipal User user){

        User userDetails = userService.getUserProfile(user.getId());

        UserProfileResponse res = new UserProfileResponse();
        res.setName(user.getName());
        res.setEmail(user.getEmail());
        res.setUsername(user.getUsername());

        return successResponse(res, "Profile Data Fetched Successfully", HttpStatus.OK);
    }
}
