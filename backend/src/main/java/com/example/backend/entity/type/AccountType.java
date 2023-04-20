package com.example.backend.entity.type;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public enum AccountType {

    KAKAO, NAVER, GOOGLE, APPLE, WEB;

    public static AccountType from(String type) {
        return AccountType.valueOf(type.toUpperCase());
    }

    public static boolean isAccountType(String type) {
        List<AccountType> accountTypes = Arrays.stream(AccountType.values())
                .filter(accountType -> accountType.name().equals(type))
                .collect(Collectors.toList());

        return accountTypes.size() != 0;
    }

}
