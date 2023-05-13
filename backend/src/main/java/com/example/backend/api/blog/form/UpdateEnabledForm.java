package com.example.backend.api.blog.form;

import lombok.Data;

import java.io.Serializable;

public class UpdateEnabledForm implements Serializable {
    private static final long serialVersionUID = -1143846212303677510L;

    @Data
    public static class Request {
        private boolean enabled;
    }

}
