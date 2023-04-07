package com.example.backend.api.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.io.Serializable;

public class LoginDto implements Serializable {

    private static final long serialVersionUID = 2617835395313524295L;

    @Data
    public static class Request {
        @NotBlank(message = "이메일을 입력하세요")
        @Size(min = 3, max = 15, message = "3 ~ 15자 내외로 띄어쓰기 없이 입력하세요")
        private String userEmail;

        @NotBlank(message = "비밀번호를 입력하세요")
        private String userPw;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response {
        private String token;
    }

}
