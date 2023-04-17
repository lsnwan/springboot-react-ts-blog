package com.example.backend.api.auth;

import com.example.backend.cmm.dto.ResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/auth")
public class AuthController {


    @PostMapping("/logout")
    public ResponseDto logout(HttpServletRequest request, HttpServletResponse response) {

        ResponseCookie cookie = ResponseCookie.from("auth_id", "")
                .maxAge(0)
                .path("/")
                .secure(true)
                .httpOnly(true)
                .sameSite("None")
                .domain("localhost")
                .build();

        response.setContentType("application/json");
        response.setHeader("Set-Cookie", cookie.toString());

        return ResponseDto.builder()
                .code(String.valueOf(HttpStatus.OK.value()))
                .message("로그아웃 되었습니다.")
                .build();
    }

}
