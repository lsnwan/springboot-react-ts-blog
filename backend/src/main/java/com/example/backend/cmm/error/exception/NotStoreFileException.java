package com.example.backend.cmm.error.exception;

public class NotStoreFileException extends RuntimeException {
    private static final long serialVersionUID = 3082141709299147678L;

    public NotStoreFileException(String message) {
        super(message);
    }
}
