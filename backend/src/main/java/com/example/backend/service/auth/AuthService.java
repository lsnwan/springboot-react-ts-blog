package com.example.backend.service.auth;

import com.example.backend.api.oauth.dto.OauthLoginDto;
import com.example.backend.api.auth.dto.SignUpDto;
import com.example.backend.cmm.error.exception.DifferentPasswordException;
import com.example.backend.cmm.utils.GeneratorUtils;
import com.example.backend.config.AppProperties;
import com.example.backend.entity.Account;
import com.example.backend.entity.AccountAuthority;
import com.example.backend.entity.Authority;
import com.example.backend.entity.FindAccount;
import com.example.backend.mail.EmailDto;
import com.example.backend.mail.EmailService;
import com.example.backend.repository.AccountAuthorityRepository;
import com.example.backend.repository.AccountRepository;
import com.example.backend.repository.AuthorityRepository;
import com.example.backend.repository.FindAccountRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.time.LocalDateTime;
import java.util.Optional;

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
    private final FindAccountRepository findAccountRepository;

    @PersistenceContext
    private EntityManager entityManager;

    /**
     * 웹 회원 가입
     * @param signUpForm
     */
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

    @Transactional
    public void createSocialAccount(final OauthLoginDto.Response oauthLoginDto) {
        /*
         * 유저 권한 가져오기
         */
        Account newAccount = modelMapper.map(oauthLoginDto, Account.class);
        Account saveAccount = accountRepository.save(newAccount);

        Authority roleUser = authorityRepository.findByAuthCode("ROLE_USER");
        accountAuthorityRepository.save(AccountAuthority.builder()
                .account(saveAccount)
                .authority(roleUser)
                .build());

        if (entityManager.contains(saveAccount)) {
            entityManager.detach(saveAccount);
        }

    }

    @Transactional
    public Account getAccountByEmail(final String email) {
        Optional<Account> accountOpt = accountRepository.findOneWithAuthoritiesByEmail(email);
        return accountOpt.orElse(null);
    }

    /**
     * 비밀번호 찾기
     * @param email
     * @param account
     * @param clientIP
     */
    public void findPassword(final String email, final Account account, final String clientIP) {
        /*
         * 이력 등록
         */
        findAccountRepository.save(FindAccount.builder()
                .email(email)
                .requestIP(clientIP)
                .build());

        /*
         * 사용자 비밀번호 변경
         */
        String tempPassword = GeneratorUtils.token(6);
        account.setPassword(passwordEncoder.encode(tempPassword));
        accountRepository.save(account);

        findPasswordSendMail(email, tempPassword, clientIP);
    }

    /**
     * 회원가입 인증 메일 발송
     * @param account
     */
    private void signUpSendMail(Account account) {
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

    /**
     * 변경된 비밀번호 메일 발송
     * @param email
     * @param tempPassword
     * @param clientIP
     */
    private void findPasswordSendMail(final String email, final String tempPassword, final String clientIP) {
        Context context = new Context();
        context.setVariable("ip", clientIP);
        context.setVariable("tempPassword", tempPassword);

        EmailDto emailMessage = EmailDto.builder()
                .to(email)
                .subject("임시 비밀번호 발급이 완료 되었습니다.")
                .message(templateEngine.process("mail/find-password", context))
                .build();

        emailService.sendEmail(emailMessage);
    }

}
