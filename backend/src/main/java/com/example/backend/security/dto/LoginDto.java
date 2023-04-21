package com.example.backend.security.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

public class LoginDto implements Serializable {
    private static final long serialVersionUID = 725998942734190578L;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
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
        private String userId;
        private String userEmail;
        private String userNickname;
        private String profilePath;
        @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
        private LocalDateTime emailVerifiedConfirmDate;
        private List<String> userRole;
    }

}
