package com.example.backend.security.provider;

import com.example.backend.security.UserAccount;
import com.example.backend.security.service.CustomUserDetailsService;
import com.example.backend.security.token.JwtAuthenticationToken;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.annotation.Resource;

/**
 * 인증 처리
 */
@Slf4j
public class JwtAuthenticationProvider implements AuthenticationProvider {

    @Resource
    private CustomUserDetailsService userDetailsService;
    @Resource
    private PasswordEncoder passwordEncoder;

     @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
         log.info("/*************************************");
         log.info("*  인증 로직");
         log.info("/*************************************");
         String loginId = authentication.getName();
         String password = (String) authentication.getCredentials();

         UserAccount userAccount = (UserAccount) userDetailsService.loadUserByUsername(loginId);

         if (!passwordEncoder.matches(password, userAccount.getPassword())) {
             throw new BadCredentialsException("비밀번호 오류");
         }

         return new JwtAuthenticationToken(userAccount.getAccount(), null, userAccount.getAuthorities());
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(JwtAuthenticationToken.class);
    }
}
