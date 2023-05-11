package com.example.backend.api.settings.form;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.io.Serializable;

public class ChangeNicknameForm implements Serializable {
    private static final long serialVersionUID = -6753810336767168342L;
    
    @Data
    public static class Request {

        @Pattern(regexp = "[가-힣a-zA-Z]{2,6}", message = "한글 및 영문 2~6자 내외로 띄어쓰기 없이 입력하세요")
        private String nickname;
    }
    
}
