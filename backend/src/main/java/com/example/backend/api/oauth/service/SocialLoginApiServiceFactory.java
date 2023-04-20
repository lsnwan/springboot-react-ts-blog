package com.example.backend.api.oauth.service;

import com.example.backend.entity.type.AccountType;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class SocialLoginApiServiceFactory {

    private static Map<String, SocialLoginApiService> socialLoginApiServiceMap;

    public SocialLoginApiServiceFactory(Map<String, SocialLoginApiService> socialLoginApiServiceMap) {
        this.socialLoginApiServiceMap = socialLoginApiServiceMap;
    }

    public static SocialLoginApiService getSocialLoginApiService(AccountType accountType) {
        String socialLoginApiServiceBeanName = "";

        if (AccountType.KAKAO.equals(accountType)) {
            socialLoginApiServiceBeanName = "kakaoLoginApiServiceImpl";
        } else if (AccountType.NAVER.equals(accountType)) {
            socialLoginApiServiceBeanName = "naverLoginApiServiceImpl";
        } else if (AccountType.GOOGLE.equals(accountType)) {
            socialLoginApiServiceBeanName = "goggleLoginApiServiceImpl";
        } else if (AccountType.APPLE.equals(accountType)) {
            socialLoginApiServiceBeanName = "appleLoginApiServiceImpl";
        }

        return socialLoginApiServiceMap.get(socialLoginApiServiceBeanName);
    }

}
