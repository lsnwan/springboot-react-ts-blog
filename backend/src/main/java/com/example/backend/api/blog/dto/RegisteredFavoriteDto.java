package com.example.backend.api.blog.dto;

import lombok.Data;

import java.io.Serializable;

public class RegisteredFavoriteDto implements Serializable {
    private static final long serialVersionUID = -4409013955985048058L;

    @Data
    public static class Request {
        private String blogContentIdx;
    }
}
