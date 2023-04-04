package com.example.backend.cmm.exception;

import com.example.backend.cmm.domain.ResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class AdviceController {


    @ExceptionHandler(BadRequestException.class)
    public ResponseDto<?> badRequestException(BadRequestException e) {
        return ResponseDto.builder()
                .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                .code("A-001")
                .message(e.getMessage())
                .build();
    }

}
