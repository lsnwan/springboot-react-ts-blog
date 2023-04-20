package com.example.backend.cmm.type;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum JwtValidType {

    VALID_JWT("J-000", "정상 토큰"),
    INVALID_JWT("J-001", "잘못된 토큰"),
    EXPIRED_JWT("J-002", "만료된 토큰"),
    UNSUPPORTED_JWT("J-003", "지원하지 않는 토큰"),
    ILLEGAL_ARG_JWT("J-004", "토큰 문제"),

    ;

    private final String errorCode;
    private final String description;
}
