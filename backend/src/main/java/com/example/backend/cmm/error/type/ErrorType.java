package com.example.backend.cmm.error.type;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorType {


    TEST(HttpStatus.OK, "T-001", "테스트"),

    REQUEST_ERROR(HttpStatus.BAD_REQUEST, "R-001", "파라미터 값 오류"),

    UNAUTHORIZED(HttpStatus.UNAUTHORIZED, "A-001", "로그인 하지 않음"),
    AUTHENTICATION_FAILURE(HttpStatus.BAD_REQUEST, "A-002", "로그인 실패"),
    ACCESS_DENIED(HttpStatus.FORBIDDEN, "A-002", "접근 권한 없음")

    ; // 코드

    private final HttpStatus httpStatus;
    private final String errorCode;
    private final String description;

}
