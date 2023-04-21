package com.example.backend.cmm.error.exception;

import lombok.Getter;

import java.util.HashMap;
import java.util.Map;

@Getter
public class BadRequestException extends RuntimeException {

    private static final long serialVersionUID = 6169457224395936489L;
    Map<String, Object> errorMap;

    public BadRequestException(String message, Map<String, Object> errorMap) {
        super(message);
        this.errorMap = errorMap;
    }
}
