package com.example.backend.api.oauth.model;

import com.example.backend.entity.type.AccountType;
import lombok.*;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class OauthAttributes {

    private String nickname;
    private String email;
    private String profilePath;
    private AccountType accountType;

}
