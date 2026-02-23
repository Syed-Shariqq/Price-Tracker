package com.priceTracker.Services;

import com.priceTracker.Entities.EmailOtp;
import com.priceTracker.Entities.User;
import com.priceTracker.Repositories.EmailOtpRepository;
import com.priceTracker.Repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
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

}
