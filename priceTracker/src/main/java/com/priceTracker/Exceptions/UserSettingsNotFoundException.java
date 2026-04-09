package com.priceTracker.Exceptions;

public class UserSettingsNotFoundException extends RuntimeException{

    public UserSettingsNotFoundException(String message){
        super(message);
    }
}
