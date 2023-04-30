package com.example.backend.cmm.error.exception;

public class NotCreateDirectoryException extends RuntimeException {
    private static final long serialVersionUID = -1566622092460401325L;

    public NotCreateDirectoryException(String message) {
        super(message);
    }
}
