package com.example.backend.cmm.error;

import com.example.backend.cmm.dto.ResponseDataDto;
import com.example.backend.cmm.dto.ResponseDto;
import com.example.backend.cmm.error.exception.*;
import com.example.backend.cmm.type.ErrorType;
import feign.FeignException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class AdviceController {


    @ExceptionHandler(BadRequestException.class)
    public ResponseDataDto<?> badRequestException(BadRequestException e) {
        return ResponseDataDto.builder()
                .code(ErrorType.REQUEST_ERROR.getErrorCode())
                .message(e.getMessage())
                .data(e.getErrorMap())
                .build();
    }

    @ExceptionHandler(BadTokenException.class)
    public ResponseDto badTokenException(BadTokenException e) {
        return ResponseDto.builder()
                .code(ErrorType.UNAUTHORIZED.getErrorCode())
                .message(e.getMessage())
                .build();
    }

    @ExceptionHandler(IsNotTokenException.class)
    public ResponseDto isNotTokenException(IsNotTokenException e) {
        return ResponseDto.builder()
                .code(ErrorType.UNAUTHORIZED.getErrorCode())
                .message(e.getMessage())
                .build();
    }

    @ExceptionHandler(NotFoundDataException.class)
    public ResponseDto notFoundDataException(NotFoundDataException e) {
        return ResponseDto.builder()
                .code(ErrorType.NOT_FOUND_DATA.getErrorCode())
                .message(e.getMessage())
                .build();
    }

    @ExceptionHandler(DecryptionErrorException.class)
    public ResponseDto decryptionErrorException(DecryptionErrorException e) {
        return ResponseDto.builder()
                .code(ErrorType.DECRYPTION_ERROR.getErrorCode())
                .message(e.getMessage())
                .build();
    }

    @ExceptionHandler(DifferentPasswordException.class)
    public ResponseDto differentPasswordException(DifferentPasswordException e) {
        return ResponseDto.builder()
                .code(ErrorType.DIFFERENT_PASSWORD.getErrorCode())
                .message(e.getMessage())
                .build();
    }

    @ExceptionHandler(SendMailException.class)
    public ResponseDto sendMailException(SendMailException e) {
        return ResponseDto.builder()
                .code(ErrorType.SEND_MAIL_ERROR.getErrorCode())
                .message(e.getMessage())
                .build();
    }

    @ExceptionHandler(EncodingException.class)
    public ResponseDto encodingException(EncodingException e) {
        return ResponseDto.builder()
                .code(ErrorType.UN_SUPPORT_ENCODING.getErrorCode())
                .message(e.getMessage())
                .build();
    }

    @ExceptionHandler(ValidationException.class)
    public ResponseDto validationException(ValidationException e) {
        return ResponseDto.builder()
                .code(ErrorType.REQUEST_ERROR.getErrorCode())
                .message(e.getMessage())
                .build();
    }

    @ExceptionHandler(FeignException.class)
    public ResponseEntity<ResponseDto> handleException(FeignException e) {
        return ResponseEntity.ok(ResponseDto.builder()
                .code(ErrorType.SERVER_ERROR.getErrorCode())
                .message(e.getMessage())
                .build());
    }

    @ExceptionHandler(NotCreateDirectoryException.class)
    public ResponseDto notCreateDirectoryException(NotCreateDirectoryException e) {
        return ResponseDto.builder()
                .code(ErrorType.NOT_CREATE_DIRECTORY.getErrorCode())
                .message(e.getMessage())
                .build();
    }

    @ExceptionHandler(NotStoreFileException.class)
    public ResponseDto notStoreFileException(NotStoreFileException e) {
        return ResponseDto.builder()
                .code(ErrorType.NOT_STORE_FILE.getErrorCode())
                .message(e.getMessage())
                .build();
    }

}
