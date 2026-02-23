package com.priceTracker.Services;

import com.priceTracker.Entities.EmailOtp;
import com.priceTracker.Entities.ResetPasswordToken;
import com.priceTracker.Entities.User;
import com.priceTracker.Repositories.EmailOtpRepository;
import com.priceTracker.Repositories.ResetTokenRepository;
import com.priceTracker.Repositories.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OtpService {


    private final SecureRandom random = new SecureRandom();

    @Autowired
    private final PasswordEncoder passwordEncoder;

    @Autowired
    private final EmailOtpRepository otpRepository;

    @Autowired
    private final EmailService emailService;

    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private final ResetTokenRepository tokenRepository;

    public void sendOtp(String email){

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if(user.isEmailVerified()){
            throw new RuntimeException("User Already Verified");
        }

        Optional<EmailOtp> oldOtp = otpRepository.findByEmailAndVerifiedFalse(email);

        if(oldOtp.isPresent()){

            EmailOtp otp = oldOtp.get();

            if(otp.getCreatedAt().plusSeconds(60).isAfter(LocalDateTime.now())){

                throw new RuntimeException("Wait before requesting new OTP");
            }

            otpRepository.deleteByEmail(email);
        }

        String rawOtp = String.valueOf(100000 + random.nextInt(900000));

        String hashedOtp = passwordEncoder.encode(rawOtp);

        EmailOtp otp = new EmailOtp();

        otp.setVerified(false);
        otp.setOtpHash(hashedOtp);
        otp.setEmail(email);
        otp.setAttempts(0);
        otp.setCreatedAt(LocalDateTime.now());
        otp.setExpiryTime(LocalDateTime.now().plusMinutes(3));

        otpRepository.save(otp);

       emailService.sendOtpToUser(email , rawOtp);

    }

    public void verifyOtp(String email, String rawOtp){

        EmailOtp otp = otpRepository.findByEmailAndVerifiedFalse(email)
                .orElseThrow(() -> new RuntimeException("Otp not Found"));

        //Check Expiration
        if(LocalDateTime.now().isAfter(otp.getExpiryTime())){

            otpRepository.deleteByEmail(email);
            throw new RuntimeException("Otp expired");

        }
        //Check attempts
        if(otp.getAttempts() >= 5){

            otpRepository.deleteByEmail(email);
            throw new RuntimeException("Too many attempts.");
        }

        //Check validity
        if(!passwordEncoder.matches(rawOtp , otp.getOtpHash())){

            otp.setAttempts(otp.getAttempts() + 1);
            otpRepository.save(otp);

            throw new RuntimeException("Invalid Otp");
        }

        otp.setVerified(true);
        otpRepository.save(otp);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setEmailVerified(true);
        userRepository.save(user);

    }

    public String generateToken(){

        byte[] bytes = new byte[32];
        random.nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);

    }


                                    // Forgot Password Section

    @Transactional
    public void forgotPassword(String email){

        Optional<User> optionalUser = userRepository.findByEmail(email);

        if(optionalUser.isEmpty()){
            return;
        }

        Optional<ResetPasswordToken> oldToken = tokenRepository.findByEmailAndUsedFalse(email);

        if(oldToken.isPresent()){

            ResetPasswordToken token = oldToken.get();

            if(token.getCreatedAt().plusSeconds(60).isAfter(LocalDateTime.now())){
                return;
            }

            tokenRepository.deleteByEmail(email);

        }

        userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        tokenRepository.deleteByEmail(email);

        String rawToken = generateToken();

        String resetLink = "http://localhost:3000/reset-password?token=" + rawToken;

        String hashedToken = passwordEncoder.encode(rawToken);

        ResetPasswordToken token = new ResetPasswordToken();
        token.setHashToken(hashedToken);
        token.setUsed(false);
        token.setCreatedAt(LocalDateTime.now());
        token.setEmail(email);
        token.setExpiry(LocalDateTime.now().plusMinutes(15));

        tokenRepository.save(token);

        emailService.sendResetPass(email , resetLink);

    }

    @Transactional
    public void resetPassword(String email , String rawToken, String newPassword){

        ResetPasswordToken token = tokenRepository.findByEmailAndUsedFalse(email)
                .orElseThrow(() -> new RuntimeException("Invalid Token"));

        if(LocalDateTime.now().isAfter(token.getExpiry())){

            tokenRepository.deleteByEmail(email);
            throw new RuntimeException("Token Expired");
        }

        if(!passwordEncoder.matches(rawToken, token.getHashToken())){

            throw new RuntimeException("Token is Invalid");
        }

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setPassword(Objects.requireNonNull(passwordEncoder.encode(newPassword)));
        userRepository.save(user);

        token.setUsed(true);
        tokenRepository.save(token);

        tokenRepository.deleteByEmail(email);

    }
}
