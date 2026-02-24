package com.priceTracker.Exceptions;

public class AccountNotVerifiedException extends RuntimeException {

    public AccountNotVerifiedException(String message){
        super(message);
    }
}
