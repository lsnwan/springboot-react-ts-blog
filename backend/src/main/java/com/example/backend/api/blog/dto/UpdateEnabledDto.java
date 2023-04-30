package com.example.backend.api.blog.dto;

import lombok.Data;

import java.io.Serializable;

public class UpdateEnabledDto implements Serializable {
    private static final long serialVersionUID = -1143846212303677510L;

    @Data
    public static class Request {
        private boolean enabled;
    }

}
