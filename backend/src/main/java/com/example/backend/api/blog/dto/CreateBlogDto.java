package com.example.backend.api.blog.dto;

import lombok.Data;

import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.io.Serializable;

public class CreateBlogDto implements Serializable {
    private static final long serialVersionUID = 2162858189341350260L;

    @Data
    public static class Request {
        @Pattern(regexp = "^[a-z0-9-]{3,20}$", message = "띄어쓰기 없이 영문 소문자와 숫자 및 '-' 조합으로 입력하세요")
        @Size(min = 3, max = 20, message = "3~20자 내외로 입력하세요")
        private String blogPath;
    }
}
