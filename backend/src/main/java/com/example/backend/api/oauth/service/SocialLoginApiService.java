package com.example.backend.api.oauth.service;

import com.example.backend.api.oauth.model.OauthAttributes;

public interface SocialLoginApiService {

    OauthAttributes getUserInfo(String accessToken);

}
