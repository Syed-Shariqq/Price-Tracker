package com.priceTracker.Exceptions;

public class OtpExpiredException extends RuntimeException{

    public OtpExpiredException(String message){
        super(message);
    }
}
