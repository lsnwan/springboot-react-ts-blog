package com.example.backend.security.filter;

import com.example.backend.cmm.dto.ResponseDto;
import com.example.backend.cmm.error.exception.BadTokenException;
import com.example.backend.cmm.error.exception.IsNotTokenException;
import com.example.backend.cmm.type.ErrorType;
import com.example.backend.cmm.type.JwtValidType;
import com.example.backend.cmm.utils.CommonUtils;
import com.example.backend.security.provider.TokenProvider;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;

import javax.servlet.*;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;

@Slf4j
public class JwtVerificationFilter extends GenericFilter {

    private static final long serialVersionUID = -6164102562069746554L;
    public static final String AUTHORIZATION_HEADER = "Authorization";
    private final TokenProvider tokenProvider;

    public JwtVerificationFilter(TokenProvider tokenProvider) {
        this.tokenProvider = tokenProvider;
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        log.info("JWT 검증 필터 작동 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        HttpServletRequest httpServletRequest = (HttpServletRequest) request;
        String token = resolveToken(httpServletRequest);

        if (!StringUtils.hasText(token)) {
            chain.doFilter(request, response);
            return;
        }

        JwtValidType jwtValidType = tokenProvider.validateToken(token);
        if (StringUtils.hasText(token) && jwtValidType == JwtValidType.VALID_JWT) {
            Authentication authentication = tokenProvider.getAuthentication(token);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            chain.doFilter(request, response);
            return;
        }

        if (jwtValidType != JwtValidType.VALID_JWT) {
            response.setContentType("application/json");

            ObjectMapper mapper = new ObjectMapper();
            mapper.writeValue(
                    response.getOutputStream(),
                    ResponseDto.builder()
                            .code(ErrorType.UNAUTHORIZED.getErrorCode())
                            .message("로그인이 필요합니다.").build()
            );
        }

    }

    /**
     * 토큰 값 추출
     * @param request
     * @return
     */
    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader(AUTHORIZATION_HEADER);
        if (!StringUtils.hasText(bearerToken)) {

            String authToken = CommonUtils.getCookie(request, "auth_id");
            if (!StringUtils.hasText(authToken)) {
                return null;
            }

            bearerToken = "Bearer " + authToken;
        }

        if (bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }

        return null;
    }
}
