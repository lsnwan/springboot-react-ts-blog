package com.example.backend.api.oauth.validator;

import com.example.backend.cmm.error.exception.BadTokenException;
import com.example.backend.cmm.error.exception.ValidationException;
import com.example.backend.entity.type.AccountType;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
public class OauthValidator {

    public void validateAuthorization(final String authorizationHeader) {

        if (!StringUtils.hasText(authorizationHeader)) {
            throw new BadTokenException("헤더가 존재하지 않습니다.");
        }

        String[] authorizations = authorizationHeader.split(" ");
        if (authorizations.length < 2 || (!"Bearer".equals(authorizations[0]))) {
            throw new BadTokenException("토큰 정보가 올바르지 않습니다.");
        }
    }

    public void validateAccountType(final String accountType) {
        if (!AccountType.isAccountType(accountType)) {
            throw new ValidationException("정의하지 않은 타입 입니다.");
        }
    }

}
