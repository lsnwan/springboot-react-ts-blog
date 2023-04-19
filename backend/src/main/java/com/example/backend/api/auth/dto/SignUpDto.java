package com.example.backend.api.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Pattern;
import java.io.Serializable;

public class SignUpDto implements Serializable {

    private static final long serialVersionUID = 5386467531389666701L;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Request {

        @Pattern(regexp = "^[_a-z0-9-]+(.[_a-z0-9-]+)*@(?:\\w+\\.)+\\w+$", message = "이메일 형식으로 입력하세요")
        private String email;

        @Pattern(regexp = "^.*(?=^.{8,20}$)(?=.*\\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$", message = "특수문자 포함 문자와 숫자 조합으로 8~20자 내외로 입력하세요")
        private String password;

        private String passwordConfirm;

    }


}
