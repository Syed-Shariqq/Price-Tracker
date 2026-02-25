package com.priceTracker.Services;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class EmailService {

     private final JavaMailSender mailSender;

     public void priceAlert(String toEmail, String productName
                       , BigDecimal currentPrice, BigDecimal targetPrice){

         SimpleMailMessage message = new SimpleMailMessage();

          message.setTo(toEmail);
          message.setSubject("Price Alert!!");
          message.setText("Good news!\n\n"+ "The product \"" + productName + "\"\n"
                         + "has dropped to ₹" + currentPrice + "\n\n"+ "Your target price was ₹" + targetPrice + "\n\n"
                         + "Check it now!");

         mailSender.send(message);
     }

     public void sendOtpToUser(String email, String rawOtp){

         SimpleMailMessage message = new SimpleMailMessage();

         message.setTo(email);
         message.setSubject("Verify your email --- Price Tracker");
         message.setText("Your Otp is: " + rawOtp + "\nvalid for 5 minutes.");

         mailSender.send(message);

     }

    public void sendResetPass(String email, String resetLink){

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(email);
        message.setSubject("Account Recovery --- Price Tracker");
        message.setText("Click the link below to reset your password:\n\n" + resetLink +
                "\n\nThis link expires in 15 minutes.");

        mailSender.send(message);

    }

}
