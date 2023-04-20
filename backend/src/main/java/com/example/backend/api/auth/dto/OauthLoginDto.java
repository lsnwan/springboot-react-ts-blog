package com.example.backend.api.auth.dto;

import com.example.backend.entity.Account;
import com.example.backend.entity.AccountAuthority;
import com.example.backend.entity.type.AccountType;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

public class OauthLoginDto {

    @Getter @Setter
    public static class Request {
        private String accountType;
        private String code;
    }


    @Builder
    @Getter @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @ToString
    public static class Response {

        private String nickname;
        private String email;
        private String profilePath;
        private AccountType accountType;
        private String id;
        private boolean enabled;
        private LocalDateTime emailVerifiedDate;
        private LocalDateTime emailVerifiedConfirmDate;
        private String emailVerifiedCode;
        private List<AccountAuthority> authorities;
    }

}
