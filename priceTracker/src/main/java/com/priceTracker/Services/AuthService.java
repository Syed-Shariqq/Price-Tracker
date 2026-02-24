package com.priceTracker.Services;

import com.priceTracker.DTOs.LoginRequest;
import com.priceTracker.DTOs.SignUpDto;
import com.priceTracker.Entities.User;
import com.priceTracker.Exceptions.InvalidCredentialsException;
import com.priceTracker.Repositories.UserRepository;
import com.priceTracker.Security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private OtpService otpService;

    public void userSignUp(SignUpDto signup){

        User user = new User();
        user.setEmail(signup.getEmail());
        user.setPassword(Objects.requireNonNull(passwordEncoder.encode(signup.getPassword())));
        user.setUsername(signup.getUsername());

        userRepository.save(user);

        otpService.sendOtp(user.getEmail());

    }

    public String userLogin(LoginRequest logInInfo){

        UserDetails userDetails = userService
                .loadUserByUsername(logInInfo.getEmailOrUsername());

        if(!passwordEncoder.matches(logInInfo.getPassword(), userDetails.getPassword())){
            throw new InvalidCredentialsException("Invalid Credentials");
        }
        return jwtUtil.generateToken(userDetails);

    }
}
