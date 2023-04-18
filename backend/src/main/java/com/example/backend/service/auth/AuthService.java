package com.example.backend.service.auth;

import com.example.backend.api.auth.dto.SignUpDto;
import com.example.backend.cmm.dto.ResponseDto;
import com.example.backend.cmm.error.exception.DifferentPasswordException;
import com.example.backend.cmm.utils.GeneratorUtils;
import com.example.backend.config.AppProperties;
import com.example.backend.entity.Account;
import com.example.backend.entity.AccountAuthority;
import com.example.backend.entity.Authority;
import com.example.backend.mail.EmailDto;
import com.example.backend.mail.EmailService;
import com.example.backend.repository.AccountAuthorityRepository;
import com.example.backend.repository.AccountRepository;
import com.example.backend.repository.AuthorityRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.time.LocalDateTime;

@Service
@Slf4j
@RequiredArgsConstructor
public class AuthService {

    private final AccountRepository accountRepository;
    private final AccountAuthorityRepository accountAuthorityRepository;
    private final AuthorityRepository authorityRepository;
    private final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;
    private final AppProperties appProperties;
    private final EmailService emailService;
    private final TemplateEngine templateEngine;

    public void signUp(final SignUpDto.Request signUpForm) {

        if (!signUpForm.getPassword().equals(signUpForm.getPasswordConfirm())) {
            throw new DifferentPasswordException("비밀번호가 일치하지 않습니다.");
        }

        /*
         * 유저 권한 가져오기
         */
        Authority roleUser = authorityRepository.findByAuthCode("ROLE_USER");

        /*
         * 사용자 등록
         */
        String emailCode = GeneratorUtils.token(6);
        Account newAccount = modelMapper.map(signUpForm, Account.class);
        newAccount.setNickname(GeneratorUtils.token(8));
        newAccount.setId(GeneratorUtils.uniqueId());
        newAccount.setEnabled(true);
        newAccount.setPassword(passwordEncoder.encode(signUpForm.getPassword()));
        newAccount.setEmailVerifiedDate(LocalDateTime.now());
        newAccount.setEmailVerifiedCode(emailCode);

        /*
         * 사용자 권한 등록
         */
        Account saveAccount = accountRepository.save(newAccount);
        accountAuthorityRepository.save(AccountAuthority.builder()
                        .account(saveAccount)
                        .authority(roleUser)
                        .build());


        /*
         * 인증 메일 발송
         */
        signUpSendMail(saveAccount);

    }

    /**
     * 회원가입 인증 메일 보내기
     * @param account
     */
    public void signUpSendMail(Account account) {
        Context context = new Context();
        context.setVariable("link", "/auth/verified-email-check?code=" + account.getEmailVerifiedCode() + "&uid=" + account.getId());
        context.setVariable("email", account.getEmail());
        context.setVariable("linkName", "이메일 인증하기");
        context.setVariable("message", "<p>아래 링크를 클릭하여 인증을 완료하세요</p><p>인증을 완료하면 모든 서비스를 이용할 수 있습니다.</p>");
        context.setVariable("host", appProperties.getHost());

        EmailDto emailMessage = EmailDto.builder()
                .to(account.getEmail())
                .subject("YouBlog 가입을 환영합니다.")
                .message(templateEngine.process("mail/sign-up", context))
                .build();

        emailService.sendEmail(emailMessage);

    }


}
