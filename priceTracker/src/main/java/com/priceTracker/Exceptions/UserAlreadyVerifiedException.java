package com.priceTracker.Exceptions;

public class UserAlreadyVerifiedException extends RuntimeException{

    public UserAlreadyVerifiedException(String message){
        super(message);
    }
}
