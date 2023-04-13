package com.example.backend.cmm.error.exception;

public class IsNotTokenException extends RuntimeException {

    private static final long serialVersionUID = 8611881649225240483L;

    public IsNotTokenException(String message) {
        super(message);
    }
}
