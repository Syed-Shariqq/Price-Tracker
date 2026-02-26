package com.priceTracker.events;

import com.priceTracker.Entities.UserTrackedProduct;
import com.priceTracker.Services.EmailService;
import jakarta.validation.constraints.Email;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@Component
public class PriceDropListener {

    @Autowired
    private EmailService emailService;

    @Async
    @EventListener
    public void handleEventListener(PriceDropEvent priceDropEvent){


        System.out.println("EVENT RECEIVED FOR USER: "
                + priceDropEvent.getEmail());

        emailService.priceAlert(
                priceDropEvent.getEmail(),
                priceDropEvent.getProductName(),
                priceDropEvent.getTargetPrice(),
                priceDropEvent.getNewPrice()
        );

    }
}
