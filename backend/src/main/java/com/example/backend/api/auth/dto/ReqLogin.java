package com.example.backend.api.auth.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.io.Serializable;

@Data
public class ReqLogin implements Serializable {
    private static final long serialVersionUID = -2419889697178917969L;

    @NotBlank(message = "이메일을 입력하세요")
    @Size(min = 3, max = 15, message = "3 ~ 15자 내외로 띄어쓰기 없이 입력하세요")
    private String userEmail;

    @NotBlank(message = "비밀번호를 입력하세요")
    private String userPw;
}
