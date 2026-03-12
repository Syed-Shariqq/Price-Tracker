package com.priceTracker.Exceptions;

public class InvalidUrlException extends RuntimeException {

    public InvalidUrlException(String message){
        super(message);
    }
}
