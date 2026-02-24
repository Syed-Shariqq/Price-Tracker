package com.priceTracker.payload;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class ApiResponse<T> {

    private LocalDateTime timeStamp;

    private int status;

    private String message;

    private T data;
}
