package com.example.backend.security.filter;

import com.example.backend.cmm.dto.ResponseDto;
import com.example.backend.cmm.error.type.ErrorType;
import com.example.backend.security.dto.LoginDto;
import com.example.backend.security.token.JwtAuthenticationToken;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.thymeleaf.util.StringUtils;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 로그인 검증
 */
@Slf4j
public class JwtLoginProcessingFilter extends AbstractAuthenticationProcessingFilter {

    ObjectMapper objectMapper = new ObjectMapper();

    public JwtLoginProcessingFilter(String defaultFilterProcessesUrl) {
        super(defaultFilterProcessesUrl);
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException, IOException, ServletException {

        LoginDto.Request loginForm = objectMapper.readValue(request.getReader(), LoginDto.Request.class);
        if (StringUtils.isEmpty(loginForm.getUserEmail()) || StringUtils.isEmpty(loginForm.getUserPw())) {
            response.setContentType("application/json");
            response.setStatus(HttpServletResponse.SC_OK);

            objectMapper.writeValue(
                    response.getOutputStream(),
                    ResponseDto.builder()
                            .code(ErrorType.AUTHENTICATION_FAILURE.getErrorCode())
                            .message("아이디와 비밀번호를 입력하세요").build()
            );
            return null;
        }

        JwtAuthenticationToken jwtAuthenticationToken = new JwtAuthenticationToken(loginForm.getUserEmail(), loginForm.getUserPw());

        return getAuthenticationManager().authenticate(jwtAuthenticationToken);
    }
}
