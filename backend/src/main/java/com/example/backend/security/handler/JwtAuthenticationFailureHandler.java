package com.example.backend.security.handler;

import com.example.backend.cmm.dto.ResponseDto;
import com.example.backend.cmm.error.type.ErrorType;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
public class JwtAuthenticationFailureHandler implements AuthenticationFailureHandler {

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        response.setStatus(HttpServletResponse.SC_OK);
        response.setContentType("application/json");

        log.info(exception.getMessage());

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.writeValue(
                response.getOutputStream(),
                ResponseDto.builder()
                        .code(ErrorType.AUTHENTICATION_FAILURE.getErrorCode())
                        .message("아이디와 비밀번호를 확인하세요")
                        .build()
        );
    }
}
