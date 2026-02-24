package com.priceTracker.Exceptions;

public class ProductAlreadyTrackingException extends RuntimeException {

    public ProductAlreadyTrackingException(String message){
        super(message);
    }
}
