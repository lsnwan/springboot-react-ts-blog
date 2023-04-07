package com.example.backend.security.handler;

import com.example.backend.cmm.dto.ResponseDto;
import com.example.backend.cmm.error.type.ErrorType;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@Slf4j
public class JwtAccessDeniedHandler implements AccessDeniedHandler {

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {
        log.info("접근 권한이 없습니다.");
        response.setContentType("application/json");
        response.setStatus(HttpServletResponse.SC_OK);

        ObjectMapper mapper = new ObjectMapper();
        mapper.writeValue(
                response.getOutputStream(),
                ResponseDto.builder()
                        .code(ErrorType.ACCESS_DENIED.getErrorCode())
                        .message("접근할 수 없습니다.").build()
        );
    }
}
