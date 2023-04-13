package com.example.backend.security.entrypoint;

import com.example.backend.cmm.dto.ResponseDto;
import com.example.backend.cmm.type.ErrorType;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@Slf4j
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        log.error("인증을 하지 않았습니다.");
        response.setContentType("application/json");
        response.setStatus(HttpServletResponse.SC_OK);

        ObjectMapper mapper = new ObjectMapper();
        mapper.writeValue(
                response.getOutputStream(),
                ResponseDto.builder()
                        .code(ErrorType.UNAUTHORIZED.getErrorCode())
                        .message("로그인이 필요합니다.").build()
        );
    }
}
