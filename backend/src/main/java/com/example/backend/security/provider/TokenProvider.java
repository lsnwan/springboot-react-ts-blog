package com.example.backend.security.provider;

import com.example.backend.cmm.utils.AES256;
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

import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
@Slf4j
@RequiredArgsConstructor
public class TokenProvider implements InitializingBean {

    private static final String AUTHORITIES_KEY = "auth";

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.token-expire-time}")
    private long tokenExpireTime;
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
    public String createToken(Authentication authentication) {
        String authorities = authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        long now = (new Date()).getTime();
        Date validity = new Date(now + this.tokenExpireTime);

        Account account = (Account) authentication.getPrincipal();

        String accessToken = Jwts.builder()
                .setSubject(account.getId())
                .claim(AUTHORITIES_KEY, authorities)
                .signWith(key, SignatureAlgorithm.HS512)
                .setExpiration(validity)
                .compact();

        String encryptAccessToken = "";
        try {
            encryptAccessToken = aes256.encrypt(accessToken);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        return encryptAccessToken;
    }

    /**
     * 토큰 정보를 받아 Authentication 객체를 만듬
     * @param token
     * @return
     */
    public Authentication getAuthentication(String token) {

        String decryptAccessToken = "";
        try {
            decryptAccessToken = aes256.decrypt(token);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        Claims claims = Jwts
                .parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(decryptAccessToken)
                .getBody();

        Collection<? extends GrantedAuthority> authorities =
                Arrays.stream(claims.get(AUTHORITIES_KEY).toString().split(","))
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());

        Optional<Account> optAccount = accountRepository.findOneWithAuthoritiesById(claims.getSubject());
        if (optAccount.isEmpty()) {
            return null;
        }
        UserAccount principal = new UserAccount(optAccount.get(), authorities);
        return new UsernamePasswordAuthenticationToken(principal, decryptAccessToken, authorities);
    }

    /**
     * 토큰 유효성 검증
     * @param token
     * @return
     */
    public boolean validateToken(String token) {

        String decryptAccessToken = "";
        try {
            decryptAccessToken = aes256.decrypt(token);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(decryptAccessToken);
            return true;
        } catch (SecurityException | MalformedJwtException e) {
            log.info("잘못된 JWT 서명 입니다.");
        } catch (ExpiredJwtException e) {
            log.info("만료된 JWT 토큰 입니다.");
        } catch (UnsupportedJwtException e) {
            log.info("지원하지 않는 JWT 토큰 입니다.");
        } catch (IllegalArgumentException e) {
            log.info("JWT 토큰이 잘못되었습니다.");
        }

        return false;
    }

}
