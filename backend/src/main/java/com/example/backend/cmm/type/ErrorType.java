package com.example.backend.cmm.type;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

/**
 * T : 테스트
 * Q : Request 관련
 * P : Response 관련
 * A : 인증 관련
 * C : 암호화 관련
 * M : 메일 관련
 * E : 인코딩 관련
 * F : 파일 관련
 */
@Getter
@AllArgsConstructor
public enum ErrorType {

    TEST(HttpStatus.OK, "T-001", "테스트"),

    REQUEST_ERROR(HttpStatus.BAD_REQUEST, "Q-001", "파라미터 값 오류"),
    DIFFERENT_PASSWORD(HttpStatus.BAD_REQUEST, "Q-002", "비밀번호가 서로 다름"),

    UNAUTHORIZED(HttpStatus.UNAUTHORIZED, "A-001", "로그인 필요"),
    AUTHENTICATION_FAILURE(HttpStatus.BAD_REQUEST, "A-002", "로그인 실패"),
    ACCESS_DENIED(HttpStatus.FORBIDDEN, "A-003", "접근 권한 없음"),
    PRIVATE_DATA(HttpStatus.FORBIDDEN, "A-004", "비공개 데이터"),

    DECRYPTION_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "C-001", "복호화 에러"),

    SEND_MAIL_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "M-001", "메일 발송 에러"),

    UN_SUPPORT_ENCODING(HttpStatus.INTERNAL_SERVER_ERROR, "E-001", "지원하지 않는 인코딩"),

    NOT_FOUND_DATA(HttpStatus.NOT_FOUND, "D-001", "데이터 없음"),
    DUPLICATE_DATA(HttpStatus.INTERNAL_SERVER_ERROR, "D-002", "중복 데이터"),

    NO_RESPONSE_TIME(HttpStatus.INTERNAL_SERVER_ERROR, "P-001", "응답 시간이 되지 않음"),

    SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "S-001", "서버 에러"),

    NOT_CREATE_DIRECTORY(HttpStatus.INTERNAL_SERVER_ERROR, "F-001", "디렉토리 생성 실패"),
    NOT_STORE_FILE(HttpStatus.INTERNAL_SERVER_ERROR, "F-002", "파일 저장 실패"),
    FILE_CONTENT(HttpStatus.BAD_REQUEST, "F-003", "파일 타입 오류"),


    ; // 코드

    private final HttpStatus httpStatus;
    private final String errorCode;
    private final String description;

}
