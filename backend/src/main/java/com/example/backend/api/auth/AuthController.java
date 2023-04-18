package com.example.backend.api.auth;

import com.example.backend.api.auth.dto.SignUpDto;
import com.example.backend.cmm.dto.ResponseDto;
import com.example.backend.service.auth.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {

    private final AuthService authService;

    @PostMapping("/logout")
    public ResponseDto logout(HttpServletResponse response) {

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

    @PostMapping("/sign-up")
    public ResponseEntity<?> signUp(@RequestBody @Valid SignUpDto.Request signUpForm, BindingResult bindingResult) {

        authService.signUp(signUpForm);

        return ResponseEntity.ok(ResponseDto.builder()
                .code(String.valueOf(HttpStatus.CREATED.value()))
                .message("회원가입에 성공 했습니다.")
                .path("/")
                .build());

    }

}
