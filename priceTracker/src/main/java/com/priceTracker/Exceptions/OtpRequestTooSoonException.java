package com.priceTracker.Exceptions;

public class OtpRequestTooSoonException extends RuntimeException {

    public OtpRequestTooSoonException(String message){
        super(message);
    }
}
