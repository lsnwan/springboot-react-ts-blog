package com.example.backend.api.oauth;

import com.example.backend.api.oauth.client.KakaoTokenClient;
import com.example.backend.api.oauth.dto.OauthLoginDto;
import com.example.backend.api.oauth.dto.token.KakaoTokenDto;
import com.example.backend.api.oauth.validator.OauthValidator;
import com.example.backend.cmm.dto.ResponseDataDto;
import com.example.backend.cmm.utils.CommonUtils;
import com.example.backend.entity.Account;
import com.example.backend.entity.TokenManager;
import com.example.backend.entity.type.AccountType;
import com.example.backend.repository.AccountRepository;
import com.example.backend.repository.TokenManagerRepository;
import com.example.backend.security.UserAccount;
import com.example.backend.security.dto.LoginDto;
import com.example.backend.security.provider.TokenProvider;
import com.example.backend.security.token.JwtAuthenticationToken;
import com.example.backend.service.auth.AuthService;
import com.example.backend.service.oauth.OauthLoginService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.http.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@Profile({"dev", "prod"})
@RequestMapping("/oauth/")
@Slf4j
public class OauthLoginController {

    private final OauthLoginService oauthLoginService;
    private final KakaoTokenClient kakaoTokenClient;
    private final AccountRepository accountRepository;
    private final AuthService authService;
    private final TokenProvider tokenProvider;
    private final TokenManagerRepository tokenManagerRepository;
    private final OauthValidator oauthValidator;
    @Value("${kakao.client.id}")
    private String kakaoClientId;

    @Value("${kakao.client.secret}")
    private String kakaoSecret;

    @Value("${jwt.expired-time-token}")
    private Long expiredTime;

    @PostMapping("/kakao/login")
    public ResponseEntity<?> oauthLogin(@RequestBody OauthLoginDto.Request oauthLoginRequestDto, HttpServletRequest request, HttpServletResponse response) {

        Map<String, Object> result = new HashMap<>();

        oauthValidator.validateAccountType(oauthLoginRequestDto.getAccountType().toUpperCase());

        /*
         ! 받아온 인가 코드로 카카오 토큰 가져오기
         */
        String contentType = "application/x-www-form-urlencoded;charset=utf-8";
        KakaoTokenDto.Request kakaoTokenRequestDto = KakaoTokenDto.Request.builder()
                .client_id(kakaoClientId)
                .client_secret(kakaoSecret)
                .grant_type("authorization_code")
                .code(oauthLoginRequestDto.getCode())   // 프론트에서 카카오로부터 받아온 인가코드
                .redirect_uri("http://localhost:5173/oauth/kakao/callback")
                .build();

        // 카카오 토큰 요청
        KakaoTokenDto.Response kakaoToken = kakaoTokenClient.requestKakaoToken(contentType, kakaoTokenRequestDto);
        log.info(kakaoToken.toString());

        /*
         ! 받아온 카카오 토큰으로 카카오 서버에서 사용자 정보 조회
         */
        OauthLoginDto.Response oauthLoginDto = oauthLoginService.oauthLogin(kakaoToken.getAccess_token(), AccountType.from(oauthLoginRequestDto.getAccountType()));
        log.info(oauthLoginDto.toString());

        /*
         ! 받아온 사용자 정보로 내 서버에 일치하는 사용자가 있는지 확인 없으면 추가
         */
        boolean isAccount = accountRepository.existsByEmail(oauthLoginDto.getEmail());
        if (!isAccount) {
            authService.createSocialAccount(oauthLoginDto);
        }

        /*
         ! 사용자 정보 조회
         */
        Account socialAccount = authService.getAccountByEmail(oauthLoginDto.getEmail());
        if (socialAccount == null) {
            throw new UsernameNotFoundException("계정이 존재하지 않습니다.");
        }

        /*
         ! 인증객체로 토큰 생성 및 RefreshToken DB 저장
         */
        Map<String, Object> tokenMap = tokenProvider.createToken(socialAccount);
        TokenManager tokenManager = TokenManager.builder()
                .accountId(socialAccount.getId())
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
         ! SecurityContext에 저장
         */
        Collection<? extends GrantedAuthority> authorities =
                socialAccount.getAuthorities().stream()
                        .filter(obj -> obj.getAuthority() != null)
                        .map(obj -> new SimpleGrantedAuthority(obj.getAuthority().getAuthCode()))
                        .collect(Collectors.toList());
        UserAccount principal = new UserAccount(socialAccount, authorities);
        JwtAuthenticationToken jwtAuthenticationToken = new JwtAuthenticationToken(principal, null, authorities);
        SecurityContextHolder.getContext().setAuthentication(jwtAuthenticationToken);

        /*
         ! 응답 데이터 설정
         */
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.add("Set-Cookie", cookie.toString());

        result.put("authToken", tokenMap.get("authToken"));
        result.put("tokenExpiredTime", tokenMap.get("tokenExpiredTime"));
        result.put("userInfo", LoginDto.Response.builder()
                .userId(socialAccount.getId())
                .userEmail(socialAccount.getEmail())
                .userNickname(socialAccount.getNickname())
                .profilePath(socialAccount.getProfilePath())
                .emailVerifiedConfirmDate(socialAccount.getEmailVerifiedConfirmDate())
                .userRole(
                        socialAccount.getAuthorities().stream()
                                .filter(obj -> obj.getAuthority() != null)
                                .map(obj -> obj.getAuthority().getAuthCode())
                                .collect(Collectors.toList()) )
                .build());

        return ResponseEntity.ok().headers(headers).body(
                ResponseDataDto.builder()
                        .status(HttpStatus.OK.value())
                        .code(String.valueOf(HttpStatus.OK.value()))
                        .message("로그인에 성공 했습니다.")
                        .data(result)
                        .build()
        );
    }

}
