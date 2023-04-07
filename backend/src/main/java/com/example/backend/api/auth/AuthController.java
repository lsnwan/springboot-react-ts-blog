package com.example.backend.api.auth;

import com.example.backend.api.auth.dto.LoginDto;
import com.example.backend.cmm.dto.ResponseDataDto;
import com.example.backend.security.provider.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    @PostMapping("/login")
    public ResponseDataDto<LoginDto.Response> login(@Valid @RequestBody LoginDto.Request requestLogin, BindingResult bindingResult) {

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(requestLogin.getUserEmail(), requestLogin.getUserPw());

        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        String jwt = tokenProvider.createToken(authentication);

        return new ResponseDataDto<>(
                    String.valueOf(HttpStatus.OK.value()),
                    "로그인 완료 하였습니다.",
                    LoginDto.Response.builder()
                            .token(jwt)
                    .build());
    }

}
