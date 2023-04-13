package com.example.backend.cmm.error.exception;

public class BadTokenException extends RuntimeException {

    private static final long serialVersionUID = -8942099567597994041L;

    public BadTokenException(String message) {
        super(message);
    }
}
