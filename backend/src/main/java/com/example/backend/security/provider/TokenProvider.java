package com.example.backend.security.provider;

import com.example.backend.cmm.error.exception.DecryptionErrorException;
import com.example.backend.cmm.type.JwtValidType;
import com.example.backend.cmm.utils.AES256;
import com.example.backend.cmm.utils.CommonUtils;
import com.example.backend.entity.Account;
import com.example.backend.repository.AccountRepository;
import com.example.backend.security.UserAccount;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SecurityException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.servlet.http.HttpServletRequest;
import java.security.Key;
import java.util.*;
import java.util.stream.Collectors;

@Component
@Slf4j
@RequiredArgsConstructor
public class TokenProvider implements InitializingBean {

    public static final String AUTHORIZATION_HEADER = "Authorization";

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expired-time-token}")
    private long expiredTime;

    private final AccountRepository accountRepository;
    private Key key;

    private final AES256 aes256;

    @Override
    public void afterPropertiesSet() throws Exception {
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    /**
     * Authentication 객체로 토큰을 생성
     * @param authentication
     * @return
     */
    public Map<String, Object> createToken(Authentication authentication) {
        Map<String, Object> result = new HashMap<>();
        String authorities = authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        long now = (new Date()).getTime();
        Date expiredDate = new Date(now + this.expiredTime);

        Account account = (Account) authentication.getPrincipal();

        String token = Jwts.builder()
                .setSubject(account.getId())
                .claim("roles", authorities)
                .claim("email", account.getEmail())
                .claim("nickname", account.getNickname())
                .signWith(key, SignatureAlgorithm.HS512)
                .setExpiration(expiredDate)
                .compact();

        String encToken = "";
        try {
            encToken = aes256.encrypt(token);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        result.put("authToken", encToken);
        result.put("tokenExpiredTime", expiredDate);

        return result;
    }

    /**
     * 토큰 정보를 받아 Authentication 객체를 만듬
     * @param token
     * @return
     */
    public Authentication getAuthentication(String token) {

        String decToken = "";
        try {
            decToken = aes256.decrypt(token);
        } catch (Exception e) {
            e.printStackTrace();
            throw new DecryptionErrorException("서버에 문제가 발생했습니다.");
        }

        Claims claims = Jwts
                .parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(decToken)
                .getBody();

        Collection<? extends GrantedAuthority> authorities =
                Arrays.stream(claims.get("roles").toString().split(","))
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());
        String subject = claims.getSubject();
        Optional<Account> optAccount = accountRepository.findOneWithAuthoritiesById(subject);
        if (optAccount.isEmpty()) {
            return null;
        }
        UserAccount principal = new UserAccount(optAccount.get(), authorities);
        return new UsernamePasswordAuthenticationToken(principal, decToken, authorities);
    }

    /**
     * 토큰 유효성 검증
     * @param token
     * @return
     */
    public JwtValidType validateToken(String token) {
        String decryptAccessToken = "";
        try {
            decryptAccessToken = aes256.decrypt(token);
        } catch (Exception e) {
            throw new DecryptionErrorException("서버에 문제가 발생 했습니다.");
        }

        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(decryptAccessToken);
            return JwtValidType.VALID_JWT;
        } catch (SecurityException | MalformedJwtException e) {
            log.error("잘못된 JWT 서명 입니다.");
            return JwtValidType.INVALID_JWT;
        } catch (ExpiredJwtException e) {
            log.error("만료된 JWT 토큰 입니다.");
            return JwtValidType.EXPIRED_JWT;
        } catch (UnsupportedJwtException e) {
            log.error("지원하지 않는 JWT 토큰 입니다.");
            return JwtValidType.UNSUPPORTED_JWT;
        } catch (IllegalArgumentException e) {
            log.error("JWT 토큰이 잘못되었습니다.");
            return JwtValidType.ILLEGAL_ARG_JWT;
        }
    }

    /**
     * 토큰 값 추출
     * @param request
     * @return
     */
    public String resolveToken(HttpServletRequest request) {
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
