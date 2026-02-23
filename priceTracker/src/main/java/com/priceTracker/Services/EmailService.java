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

}
