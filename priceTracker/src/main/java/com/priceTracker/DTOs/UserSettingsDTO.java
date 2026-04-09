package com.priceTracker.DTOs;

import lombok.Data;

@Data
public class UserSettingsDTO {
    private boolean notifyOnDrop;
    private boolean notifyOnIncrease;
    private int minDropPercentage;
    private String notificationMethod;
    private boolean autoFetch;
    private String fetchInterval;
    private String lastFetch;
}