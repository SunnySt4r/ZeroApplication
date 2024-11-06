package com.example.ZeroApplication.exception.handler;

import org.springdoc.api.ErrorMessage;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class AppExceptionHandler {
    
    // @ExceptionHandler({Exception.class})
    // protected ResponseEntity<ErrorMessage> handleNotFound(Exception ex) {
    //     return ResponseEntity
    //             .status(HttpStatus.NOT_FOUND)
    //             .body(new ErrorMessage(ex.getMessage()));
    // }
}