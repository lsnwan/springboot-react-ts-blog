package com.example.backend.api.oauth.client;

import com.example.backend.api.oauth.form.token.KakaoTokenForm;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.cloud.openfeign.SpringQueryMap;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(url = "https://kauth.kakao.com", name = "kakaoTokenClient")
public interface KakaoTokenClient {

    @PostMapping(value = "/oauth/token", consumes = "application/json")
    KakaoTokenForm.Response requestKakaoToken(@RequestHeader("Content-Type") String contentType,
                                              @SpringQueryMap KakaoTokenForm.Request request);

}
