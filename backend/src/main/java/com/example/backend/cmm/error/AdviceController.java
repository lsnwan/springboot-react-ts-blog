package com.example.backend.cmm.error;

import com.example.backend.cmm.dto.ResponseDto;
import com.example.backend.cmm.error.exception.*;
import com.example.backend.cmm.type.ErrorType;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class AdviceController {


    @ExceptionHandler(BadRequestException.class)
    public ResponseDto badRequestException(BadRequestException e) {
        return ResponseDto.builder()
                .code(ErrorType.REQUEST_ERROR.getErrorCode())
                .message(e.getMessage())
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
}
