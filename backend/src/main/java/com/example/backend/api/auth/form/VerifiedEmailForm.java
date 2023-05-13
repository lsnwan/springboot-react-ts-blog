package com.example.backend.api.auth.form;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

public class VerifiedEmailForm implements Serializable {
    private static final long serialVersionUID = -6134098133394636450L;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Request {

        private String code;
        private String uid;

    }
}
