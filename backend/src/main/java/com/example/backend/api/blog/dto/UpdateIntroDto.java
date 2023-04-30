package com.example.backend.api.blog.dto;

import lombok.Data;

import javax.validation.constraints.Size;
import java.io.Serializable;

public class UpdateIntroDto implements Serializable {
    private static final long serialVersionUID = -3212342299884838502L;

    @Data
    public static class Request {

        @Size(max = 1000, message = "1000자 내외로 입력해 주세요")
        private String intro;

    }
}
