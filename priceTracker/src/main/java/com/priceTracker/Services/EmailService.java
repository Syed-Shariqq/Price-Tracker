package com.priceTracker.Services;

import com.sendgrid.*;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class EmailService {

    @Value("${SENDGRID_API_KEY}")
    private String apiKey;

    @Value("${FROM_EMAIL}")
    private String fromEmail;

    private void sendEmail(String to, String subject, String body) {
        Email from = new Email(fromEmail);
        Email toEmail = new Email(to);
        Content content = new Content("text/plain", body);

        Mail mail = new Mail(from, subject, toEmail, content);
        SendGrid sg = new SendGrid(apiKey);
        Request request = new Request();

        try {
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());
            sg.api(request);
        } catch (IOException e) {
            throw new RuntimeException("Failed to send email", e);
        }
    }

    public void priceAlert(String toEmail, String productName,
                           BigDecimal currentPrice, BigDecimal targetPrice) {

        String body =
                "Good news!\n\n" +
                        "The product \"" + productName + "\" has dropped to ₹" + currentPrice +
                        "\n\nYour target price was ₹" + targetPrice +
                        "\n\nCheck it now!";

        sendEmail(toEmail, "Price Alert!!", body);
    }

    public void sendOtpToUser(String email, String rawOtp) {

        String body =
                "Your OTP is: " + rawOtp +
                        "\nValid for 5 minutes.";

        sendEmail(email, "Verify your email --- Price Tracker", body);
    }

    public void sendResetPass(String email, String resetLink) {

        String body =
                "Click the link below to reset your password:\n\n" +
                        resetLink +
                        "\n\nThis link expires in 15 minutes.";

        sendEmail(email, "Account Recovery --- Price Tracker", body);
    }
}
