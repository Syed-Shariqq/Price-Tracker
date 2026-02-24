package com.priceTracker.Exceptions;

import com.priceTracker.DTOs.ErrorResponseDto;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionalHandler {

    public ErrorResponseDto buildResponse(RuntimeException ex,
                                          HttpStatus status, HttpServletRequest request){

        return ErrorResponseDto.builder()
                .timeStamp(LocalDateTime.now())
                .error(status.name())
                .message(ex.getMessage())
                .path(request.getRequestURI())
                .status(status.value())
                .build();
    }

    @ExceptionHandler(UserNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorResponseDto handleUserNotFound(UserNotFoundException ex, HttpServletRequest request){

        return buildResponse(ex, HttpStatus.NOT_FOUND, request);

    }

    @ExceptionHandler(InvalidOtpException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ErrorResponseDto handleInvalidOtp(InvalidOtpException ex, HttpServletRequest request){

        return buildResponse(ex, HttpStatus.UNAUTHORIZED, request);
    }

    @ExceptionHandler(OtpExpiredException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponseDto handleExpiredOtp(OtpExpiredException ex, HttpServletRequest request){

        return buildResponse(ex, HttpStatus.BAD_REQUEST, request);
    }

    @ExceptionHandler(InvalidCredentialsException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ErrorResponseDto handleInvalidCredentials(InvalidCredentialsException ex,
                                                     HttpServletRequest request){

        return buildResponse(ex , HttpStatus.UNAUTHORIZED, request);

    }

    @ExceptionHandler(UserAlreadyVerifiedException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public ErrorResponseDto handleUserAlreadyVerified(UserAlreadyVerifiedException ex, HttpServletRequest request){

        return buildResponse(ex, HttpStatus.CONFLICT, request);
    }

    @ExceptionHandler(OtpRequestTooSoonException.class)
    @ResponseStatus(HttpStatus.TOO_MANY_REQUESTS)
    public ErrorResponseDto handleOtpRequestTooSoon(OtpRequestTooSoonException ex, HttpServletRequest request){

        return buildResponse(ex, HttpStatus.TOO_MANY_REQUESTS, request);
    }

    @ExceptionHandler(OtpNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorResponseDto handleOtpNotFound(OtpNotFoundException ex, HttpServletRequest request){

        return buildResponse(ex, HttpStatus.NOT_FOUND, request);
    }

    @ExceptionHandler(TokenInvalidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponseDto handleTokenInvalid(TokenInvalidException ex, HttpServletRequest request){

        return buildResponse(ex, HttpStatus.BAD_REQUEST, request);
    }

    @ExceptionHandler(TokenExpiredException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponseDto handleTokenExpired(TokenExpiredException ex, HttpServletRequest request){

        return buildResponse(ex, HttpStatus.BAD_REQUEST, request);
    }

    @ExceptionHandler(ProductAlreadyTrackingException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponseDto handleProductAlreadyTracking(ProductAlreadyTrackingException ex,
                                                         HttpServletRequest request){

        return buildResponse(ex, HttpStatus.BAD_REQUEST, request);
    }

    @ExceptionHandler(TooManyAttemptsException.class)
    @ResponseStatus(HttpStatus.TOO_MANY_REQUESTS)
    public ErrorResponseDto handleTooManyAttempts(TooManyAttemptsException ex, HttpServletRequest request){

        return buildResponse(ex, HttpStatus.TOO_MANY_REQUESTS, request);
    }

    @ExceptionHandler(AccountNotVerifiedException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public ErrorResponseDto handleAccountNotVerified(AccountNotVerifiedException ex
            , HttpServletRequest request){

        return buildResponse(ex, HttpStatus.FORBIDDEN, request);
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorResponseDto handleGlobalException(Exception ex, HttpServletRequest request){

        return ErrorResponseDto.builder()
                .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                .path(request.getRequestURI())
                .timeStamp(LocalDateTime.now())
                .message("Something went wrong. Try again later")
                .error(HttpStatus.INTERNAL_SERVER_ERROR.name())
                .build();
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponseDto handleValidationException(MethodArgumentNotValidException ex ,
                                                      HttpServletRequest request){

        String message = ex.getBindingResult().getFieldErrors().stream()
                .map(error -> error.getField() + ": " + error.getDefaultMessage())
                .findFirst().orElse("Validation error");

        return ErrorResponseDto.builder()
                .error(HttpStatus.BAD_REQUEST.name())
                .message(message)
                .timeStamp(LocalDateTime.now())
                .path(request.getRequestURI())
                .status(HttpStatus.BAD_REQUEST.value())
                .build();
    }
}
