package com.example.backend.cmm.error.exception;

public class SendMailException extends RuntimeException {
    private static final long serialVersionUID = 1992000853753627180L;

    public SendMailException(String message) {
        super(message);
    }
}
