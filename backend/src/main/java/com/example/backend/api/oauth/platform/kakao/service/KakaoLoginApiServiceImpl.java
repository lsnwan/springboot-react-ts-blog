package com.example.backend.api.oauth.platform.kakao.service;

import com.example.backend.api.oauth.platform.kakao.client.KakaoUserInfoClient;
import com.example.backend.api.oauth.platform.kakao.dto.KakaoUserInfoResponseDto;
import com.example.backend.entity.type.AccountType;
import com.example.backend.api.oauth.model.OauthAttributes;
import com.example.backend.api.oauth.service.SocialLoginApiService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class KakaoLoginApiServiceImpl implements SocialLoginApiService {

    private final KakaoUserInfoClient kakaoUserInfoClient;
    private final String CONTENT_TYPE = "application/x-www-form-urlencoded;charset=utf-8";


    @Override
    public OauthAttributes getUserInfo(String accessToken) {
        // 카카오에서 유저정보 가져오기
        KakaoUserInfoResponseDto kakaoUserInfoDto = kakaoUserInfoClient.getKakaoUserInfo(CONTENT_TYPE, "Bearer " + accessToken);
        KakaoUserInfoResponseDto.KakaoAccount kakaoAccount = kakaoUserInfoDto.getKakaoAccount();

        String email = kakaoAccount.getEmail();
        return OauthAttributes.builder()
                .email(!StringUtils.hasText(email) ? kakaoUserInfoDto.getId() : email)
                .nickname(kakaoAccount.getProfile().getNickname())
                .profilePath(kakaoAccount.getProfile().getThumbnailImageUrl())
                .accountType(AccountType.KAKAO)
                .build();
    }
}
