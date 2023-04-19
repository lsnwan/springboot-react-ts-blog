package com.example.backend.security.handler;

import com.example.backend.cmm.dto.ResponseDataDto;
import com.example.backend.cmm.utils.CommonUtils;
import com.example.backend.entity.Account;
import com.example.backend.entity.TokenManager;
import com.example.backend.repository.TokenManagerRepository;
import com.example.backend.security.dto.LoginDto;
import com.example.backend.security.provider.TokenProvider;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import javax.annotation.Resource;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
public class JwtAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    @Resource
    private TokenProvider tokenProvider;
    @Resource
    private TokenManagerRepository tokenManagerRepository;
    @Value("${jwt.expired-time-token}")
    private Long expiredTime;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        log.info("로그인 성공");
        Map<String, Object> result = new HashMap<>();

        /*
         ! 인증객체로 토큰 생성 및 RefreshToken DB 저장
         */
        Map<String, Object> tokenMap = tokenProvider.createToken(authentication);
        Account account = (Account) authentication.getPrincipal();
        TokenManager tokenManager = TokenManager.builder()
                .accountId(account.getId())
                .platformType(CommonUtils.getBrowserName(request.getHeader("User-Agent")))
                .refreshToken((String) tokenMap.get("authToken"))
                .expireTime((Date) tokenMap.get("tokenExpiredTime"))
                .clientIp(CommonUtils.getClientIp())
                .build();
        tokenManagerRepository.save(tokenManager);


        /*
         ! 리프레시 토큰을 쿠키에 저장
         */
        ResponseCookie cookie = ResponseCookie.from("auth_id", (String) tokenMap.get("authToken"))
                .maxAge(expiredTime.intValue())
                .path("/")
                .secure(true)
                .httpOnly(true)
                .sameSite("None")
                .domain("localhost")
                .build();

        /*
         ! 응답 데이터 설정
         */
        response.setStatus(HttpServletResponse.SC_OK);
        response.setContentType("application/json");
        response.setHeader("Set-Cookie", cookie.toString());

        result.put("authToken", tokenMap.get("authToken"));
        result.put("tokenExpiredTime", tokenMap.get("tokenExpiredTime"));
        result.put("userInfo", LoginDto.Response.builder()
                        .userId(account.getId())
                        .userEmail(account.getEmail())
                        .userNickname(account.getNickname())
                        .emailVerifiedConfirmDate(account.getEmailVerifiedConfirmDate())
                        .userRole(
                                account.getAuthorities().stream()
                                    .filter(obj -> obj.getAuthority() != null)
                                    .map(obj -> obj.getAuthority().getAuthCode())
                                    .collect(Collectors.toList()) )
                .build());

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
        objectMapper.writeValue(
                response.getOutputStream(),
                ResponseDataDto.builder()
                        .status(HttpStatus.OK.value())
                        .code(String.valueOf(HttpStatus.OK.value()))
                        .message("로그인에 성공 했습니다.")
                        .data(result).build()
        );
    }
}
