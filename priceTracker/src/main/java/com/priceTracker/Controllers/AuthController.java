package com.priceTracker.Controllers;


import com.priceTracker.DTOs.LoginRequest;
import com.priceTracker.DTOs.SignUpDto;
import com.priceTracker.Services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/signup")
    public String signUp(@RequestBody SignUpDto signup){

        authService.userSignUp(signup);
        return "User Registered Successfully";

    }

    @PostMapping("/login")
    public ResponseEntity<?> logIn(@RequestBody LoginRequest request){
        try{
            return new ResponseEntity<>(authService.userLogin(request), HttpStatus.OK);

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
