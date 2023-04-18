package com.example.backend.cmm.error.exception;

public class DifferentPasswordException extends RuntimeException {

    private static final long serialVersionUID = 4282268610403405772L;

    public DifferentPasswordException(String message) {
        super(message);
    }
}
