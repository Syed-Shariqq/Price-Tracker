package com.priceTracker.Services;

import com.priceTracker.Entities.User;
import com.priceTracker.Exceptions.TokenInvalidException;
import com.priceTracker.Exceptions.UserNotFoundException;
import com.priceTracker.Repositories.UserRepository;
import com.priceTracker.payload.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.Optional;

@Service
public class OtpService {

    @Autowired
    private StringRedisTemplate redisTemplate;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private final SecureRandom random = new SecureRandom();

    public <T> ApiResponse<T> successResponse(T data,String message, HttpStatus status){

        return ApiResponse.<T>builder()
                .message(message)
                .status(status.value())
                .data(data)
                .timeStamp(LocalDateTime.now())
                .build();
    }


    public String testRedis() {
        redisTemplate.opsForValue()
                .set("key", "hello", Duration.ofMinutes(1));

        String value = redisTemplate.opsForValue()
                .get("key");

        return "Redis value: " + value;
    }


    public String getKey() {
        return redisTemplate.opsForValue().get("key");
    }

    public ApiResponse<String> sendOtp(String email){

        String otpKey = "OTP:" + email;
        String coolDownKey = "OTP:cooldown:" + email;
        String attemptKey = "OTP:attemptKey:" + email;

       User user = userRepository.findByEmail(email)
               .orElseThrow(() -> new UserNotFoundException("User not found"));

       if(user.isEmailVerified()){

           return successResponse("User already Verified","Warning", HttpStatus.BAD_REQUEST);
       }

       Boolean cooldown = redisTemplate.hasKey(coolDownKey);

       if(Boolean.TRUE.equals(cooldown)){

           return successResponse("Please wait before requesting for another otp","Warning", HttpStatus.TOO_EARLY);
       }

        String rawOtp = String.valueOf(100000 + random.nextInt(900000));

       redisTemplate.opsForValue().set(otpKey , rawOtp , Duration.ofMinutes(5));
       redisTemplate.opsForValue().set(coolDownKey , "true" , Duration.ofMinutes(1));
       redisTemplate.opsForValue().set(attemptKey , "0" , Duration.ofMinutes(5));

       emailService.sendOtpToUser(email , rawOtp);

       return successResponse("Success."," Otp sent successfully", HttpStatus.OK);
    }

    public ApiResponse<String> verifyOtp(String email , String userOtp){

        String attemptKey = "OTP:attemptKey:" + email;
        String coolDownKey = "OTP:cooldown:" + email;
        String blockKey = "OTP:blockKey:" + email;
        String otpKey = "OTP:" + email;

        String existingOtp = redisTemplate.opsForValue().get(otpKey);

        if(existingOtp == null){

            return successResponse("Otp expired or not found","Expired",HttpStatus.NOT_FOUND);
        }

        int attemptCount = Integer.parseInt(redisTemplate.opsForValue().get(attemptKey));

        if(attemptCount >= 3){

            redisTemplate.delete(otpKey);
            redisTemplate.delete(coolDownKey);
            redisTemplate.opsForValue().set(blockKey , "true" , Duration.ofMinutes(7));
            return successResponse("Too many attempts. Try again later","Warning", HttpStatus.TOO_MANY_REQUESTS);
        }

        if(!existingOtp.equals(userOtp)){

            redisTemplate.opsForValue().increment(attemptKey);
            return successResponse("Invalid Otp","Warning", HttpStatus.UNAUTHORIZED);
        }

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        user.setEmailVerified(true);
        userRepository.save(user);

        redisTemplate.delete(attemptKey);
        redisTemplate.delete(coolDownKey);
        redisTemplate.delete(otpKey);

        return successResponse("Email verified Successfully",
                "Verification Completed",HttpStatus.OK);

    }

                         //Forgot Password

    public String generateToken(){

        byte[] bytes = new byte[32];
        random.nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);

    }



    private final String cooldownToken = "TOKEN:COOLDOWN:";
    private final String emailToken = "TOKEN:EMAIL";
    private final String token = "TOKEN:";


    @Transactional
    public String forgotPassword(String email){


        Optional<User> user = userRepository.findByEmail(email);

        if(user.isEmpty()){
            return "";
        }

        if(Boolean.TRUE.equals(redisTemplate.hasKey(cooldownToken + email))){
            return "Wait for sometime before requesting another link";
        }

        String oldToken = redisTemplate.opsForValue().get(emailToken + email);

        if(oldToken != null){
            redisTemplate.delete(token + oldToken);
            redisTemplate.delete(emailToken + email);
        }

        String rawToken = generateToken();

        redisTemplate.opsForValue().set(token + rawToken, email, Duration.ofMinutes(15));
        redisTemplate.opsForValue().set(emailToken + email , rawToken , Duration.ofMinutes(15));
        redisTemplate.opsForValue().set(cooldownToken + email, "true", Duration.ofMinutes(2));

        String resetLink = "http://localhost:3000/reset-password?token=" + rawToken;
        emailService.sendResetPass(email , resetLink);

        return "Reset link sent";
    }

    @Transactional
    public void resetPassword(String rawToken, String newPassword) {

        String email = redisTemplate.opsForValue().get(token + rawToken);

        if (email == null) {
            throw new TokenInvalidException("Invalid or expired token");
        }

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        redisTemplate.delete(token + rawToken);
        redisTemplate.delete(emailToken + email);
    }

}

