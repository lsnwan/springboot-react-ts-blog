package com.example.backend.cmm.error.exception;

public class NotFoundDataException extends RuntimeException{
    private static final long serialVersionUID = -2523117163689646797L;

    public NotFoundDataException(String message) {
        super(message);
    }
}
