package com.example.backend.security;

import com.example.backend.security.filter.JwtVerificationFilter;
import com.example.backend.security.provider.TokenProvider;
import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.access.intercept.FilterSecurityInterceptor;

public class JwtSecurityConfig extends SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity> {

    private TokenProvider tokenProvider;

    public JwtSecurityConfig(TokenProvider tokenProvider) {
        this.tokenProvider = tokenProvider;
    }

    @Override
    public void configure(HttpSecurity builder) {
        JwtVerificationFilter customFilter = new JwtVerificationFilter(tokenProvider);
        builder.addFilterAfter(customFilter, FilterSecurityInterceptor.class);
    }
}
