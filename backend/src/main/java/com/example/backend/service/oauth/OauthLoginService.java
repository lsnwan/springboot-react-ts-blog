package com.example.backend.service.oauth;

import com.example.backend.api.oauth.form.OauthLoginForm;
import com.example.backend.api.oauth.model.OauthAttributes;
import com.example.backend.api.oauth.service.SocialLoginApiService;
import com.example.backend.api.oauth.service.SocialLoginApiServiceFactory;
import com.example.backend.cmm.utils.GeneratorUtils;
import com.example.backend.entity.type.AccountType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class OauthLoginService {

    private final ModelMapper modelMapper;

    @Transactional
    public OauthLoginForm.Response oauthLogin(String accessToken, AccountType accountType) {
        SocialLoginApiService socialLoginApiService = SocialLoginApiServiceFactory.getSocialLoginApiService(accountType);
        OauthAttributes userInfo = socialLoginApiService.getUserInfo(accessToken);
        log.info(userInfo.toString());

        OauthLoginForm.Response oauthAccount = modelMapper.map(userInfo, OauthLoginForm.Response.class);
        oauthAccount.setId(GeneratorUtils.uniqueId());
        oauthAccount.setEnabled(true);
        oauthAccount.setEmailVerifiedDate(LocalDateTime.now());
        oauthAccount.setEmailVerifiedCode(GeneratorUtils.token(6));
        oauthAccount.setEmailVerifiedConfirmDate(LocalDateTime.now());

        return oauthAccount;
    }

}
