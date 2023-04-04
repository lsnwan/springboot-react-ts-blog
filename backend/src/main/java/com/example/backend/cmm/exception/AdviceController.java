package com.example.backend.cmm.exception;

import com.example.backend.cmm.domain.ResponseDto;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class AdviceController {


    @ExceptionHandler(BadRequestException.class)
    public ResponseDto<?> badRequestException(BadRequestException e) {
        return ResponseDto.builder()
                .code("R-001")
                .message(e.getMessage())
                .build();
    }

}
