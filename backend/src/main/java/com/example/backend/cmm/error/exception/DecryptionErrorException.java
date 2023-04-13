package com.example.backend.cmm.error.exception;

public class DecryptionErrorException extends RuntimeException {
    public DecryptionErrorException(String message) {
        super(message);
    }
}
