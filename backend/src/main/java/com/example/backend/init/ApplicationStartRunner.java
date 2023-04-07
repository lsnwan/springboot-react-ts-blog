package com.example.backend.init;

import com.example.backend.cmm.utils.GeneratorUtils;
import com.example.backend.entity.Account;
import com.example.backend.entity.AccountAuthority;
import com.example.backend.entity.Authority;
import com.example.backend.entity.TokenManager;
import com.example.backend.repository.AccountAuthorityRepository;
import com.example.backend.repository.AccountRepository;
import com.example.backend.repository.AuthorityRepository;
import com.example.backend.repository.TokenManagerRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Optional;

@Profile("default")
@Component
@Slf4j
@RequiredArgsConstructor
public class ApplicationStartRunner implements ApplicationRunner {

    private final AuthorityRepository authorityRepository;
    private final AccountRepository accountRepository;
    private final AccountAuthorityRepository accountAuthorityRepository;
    private final TokenManagerRepository tokenManagerRepository;
    private final PasswordEncoder passwordEncoder;


    @Override
    public void run(ApplicationArguments args) throws Exception {
        log.info("======================================================");
        log.info("시작");
        log.info("======================================================");

        Account account = Account.builder()
                .idx(1L)
                .accountType("MASTER")
                .email("admin")
                .id(GeneratorUtils.uniqueId())
                .password(passwordEncoder.encode("1234"))
                .nickname("관리자")
                .enabled(true)
                .build();

        accountRepository.save(account);


        Authority userRole = Authority.builder()
                .idx(1L)
                .authCode("ROLE_USER")
                .authName("유저")
                .build();

        authorityRepository.save(userRole);

        Authority adminRole = Authority.builder()
                .idx(2L)
                .authCode("ROLE_ADMIN")
                .authName("관리자")
                .build();
        authorityRepository.save(adminRole);

        accountAuthorityRepository.save(AccountAuthority.builder()
                .idx(1L)
                .account(account)
                .authority(userRole)
                .build());
//        accountAuthorityRepository.save(AccountAuthority.builder()
//                .idx(2L)
//                .account(account)
//                .authority(adminRole)
//                .build());

        tokenManagerRepository.save(TokenManager.builder()
                        .idx(1L)
                        .accountId("admin")
                        .platformType("WEB")
                        .refreshToken("123123123123123")
                        .expireTime(LocalDateTime.now())
                .build());

        Optional<Account> optionalAccount = accountRepository.findOneWithAuthoritiesByEmail("admin");
        log.info(optionalAccount.get().toString());
    }
}
