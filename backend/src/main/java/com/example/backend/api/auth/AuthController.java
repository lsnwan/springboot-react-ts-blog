package com.example.backend.api.auth;

import com.example.backend.api.auth.domain.ReqLogin;
import com.example.backend.api.auth.domain.ResToken;
import com.example.backend.cmm.domain.ResponseDto;
import com.example.backend.security.filter.JwtFilter;
import com.example.backend.security.provider.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    @PostMapping("/login")
    public ResponseDto<ResToken> login(@Valid @RequestBody ReqLogin reqLogin, BindingResult bindingResult) {

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(reqLogin.getUserEmail(), reqLogin.getUserPw());

        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        String jwt = tokenProvider.createToken(authentication);

        return new ResponseDto<>(String.valueOf(HttpStatus.OK.value()), "asdfadsf", new ResToken(jwt));
    }

}
