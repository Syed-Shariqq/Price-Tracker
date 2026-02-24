package com.priceTracker.DTOs;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class ErrorResponseDto {


    private LocalDateTime timeStamp;

    private String path;

    private String error;

    private String message;

    private int status;

}
