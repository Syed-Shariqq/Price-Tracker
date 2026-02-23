package com.priceTracker.Controllers;

import com.priceTracker.Services.CheckPriceService;
import com.priceTracker.Services.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    @Autowired
    private final CheckPriceService priceService;

    @Autowired
    private final EmailService emailService;

    @PostMapping("/check-prices")
    public ResponseEntity<String> triggerPriceCheck() {

        priceService.checkPrices();

        return ResponseEntity.ok("Price check triggered manually");
    }


    @PostMapping("/email")
    public ResponseEntity<String> testEmail() {

        emailService.priceAlert(
                "syedshariq0824@gmail.com",
                "Test Product",
                new BigDecimal("35.00"),
                new BigDecimal("40.00")
        );

        return ResponseEntity.ok("Test email sent");
    }
}