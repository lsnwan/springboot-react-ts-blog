package com.example.backend.cmm.error.exception;

public class CustomUnknownClientException extends RuntimeException{
    private static final long serialVersionUID = -4213568091205158663L;

    public CustomUnknownClientException(String message) {
        super(message);
    }
}
