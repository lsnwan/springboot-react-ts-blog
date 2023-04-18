package com.example.backend.service.auth;

import com.example.backend.api.auth.dto.SignUpDto;
import com.example.backend.cmm.dto.ResponseDto;
import com.example.backend.cmm.error.exception.DifferentPasswordException;
import com.example.backend.cmm.utils.GeneratorUtils;
import com.example.backend.entity.Account;
import com.example.backend.entity.AccountAuthority;
import com.example.backend.entity.Authority;
import com.example.backend.repository.AccountAuthorityRepository;
import com.example.backend.repository.AccountRepository;
import com.example.backend.repository.AuthorityRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class AuthService {

    private final AccountRepository accountRepository;
    private final AccountAuthorityRepository accountAuthorityRepository;
    private final AuthorityRepository authorityRepository;
    private final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;

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
        Account newAccount = modelMapper.map(signUpForm, Account.class);
        newAccount.setNickname(GeneratorUtils.token(8));
        newAccount.setId(GeneratorUtils.uniqueId());
        newAccount.setEnabled(true);
        newAccount.setPassword(passwordEncoder.encode(signUpForm.getPassword()));

        /*
         * 사용자 권한 등록
         */
        Account saveAccount = accountRepository.save(newAccount);
        accountAuthorityRepository.save(AccountAuthority.builder()
                        .account(saveAccount)
                        .authority(roleUser)
                        .build());

    }

}
