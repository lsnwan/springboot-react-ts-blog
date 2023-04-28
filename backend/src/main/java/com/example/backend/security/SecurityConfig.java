package com.example.backend.security;

import com.example.backend.security.entrypoint.JwtAuthenticationEntryPoint;
import com.example.backend.security.filter.JwtLoginProcessingFilter;
import com.example.backend.security.handler.JwtAccessDeniedHandler;
import com.example.backend.security.handler.JwtAuthenticationFailureHandler;
import com.example.backend.security.handler.JwtAuthenticationSuccessHandler;
import com.example.backend.security.provider.JwtAuthenticationProvider;
import com.example.backend.security.provider.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.firewall.DefaultHttpFirewall;
import org.springframework.security.web.firewall.HttpFirewall;

@EnableWebSecurity
@RequiredArgsConstructor
@EnableGlobalMethodSecurity(securedEnabled = true, prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final TokenProvider tokenProvider;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;
//    private final RoleHierarchyService roleHierarchyService;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * 계층 권한 설정
     * : ApplicationStartRunner가 실행 되기 전에 작동
     * @return
     */
//    @Bean
//    public RoleHierarchyImpl roleHierarchy() {
//        String allHierarchy = roleHierarchyService.findAllHierarchy();
//        RoleHierarchyImpl roleHierarchy = new RoleHierarchyImpl();
//        roleHierarchy.setHierarchy(allHierarchy);
//        return roleHierarchy;
//    }

    @Bean
    public JwtLoginProcessingFilter jwtLoginProcessingFilter() throws Exception {
        JwtLoginProcessingFilter jwtLoginProcessingFilter = new JwtLoginProcessingFilter("/login");
        jwtLoginProcessingFilter.setAuthenticationManager(authenticationManagerBean());
        jwtLoginProcessingFilter.setAuthenticationSuccessHandler(jwtAuthenticationSuccessHandler());
        jwtLoginProcessingFilter.setAuthenticationFailureHandler(jwtAuthenticationFailureHandler());
        return jwtLoginProcessingFilter;
    }

    @Bean
    public AuthenticationSuccessHandler jwtAuthenticationSuccessHandler() {
        return new JwtAuthenticationSuccessHandler();
    }

    @Bean
    public AuthenticationFailureHandler jwtAuthenticationFailureHandler() {
        return new JwtAuthenticationFailureHandler();
    }

    @Bean
    public AuthenticationProvider jwtAuthenticationProvider() {
        return new JwtAuthenticationProvider();
    }

    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();

        http.formLogin().disable();
        http.httpBasic().disable();
        http.headers().frameOptions().sameOrigin();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        http.exceptionHandling()
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .accessDeniedHandler(jwtAccessDeniedHandler);

        http.apply(new JwtSecurityConfig(tokenProvider));

        http.addFilterBefore(jwtLoginProcessingFilter(), UsernamePasswordAuthenticationFilter.class);

        http.cors();
    }

    @Override
    public void configure(WebSecurity web) {
        web.ignoring()
                .mvcMatchers("/h2-console/**", "/favicon.ico")
                .requestMatchers(PathRequest.toStaticResources().atCommonLocations());

        web.httpFirewall(defaultHttpFirewall());
    }

    @Bean
    public HttpFirewall defaultHttpFirewall() {
        return new DefaultHttpFirewall();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(jwtAuthenticationProvider());
    }
}

