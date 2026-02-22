package com.priceTracker.Controllers;

import com.priceTracker.Services.CheckPriceService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    @Autowired
    private final CheckPriceService priceService;

    @PostMapping("/check-prices")
    public ResponseEntity<String> triggerPriceCheck() {

        priceService.checkPrices();

        return ResponseEntity.ok("Price check triggered manually");
    }
}