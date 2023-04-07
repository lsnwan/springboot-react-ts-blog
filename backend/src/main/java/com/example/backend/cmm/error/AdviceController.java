package com.example.backend.cmm.error;

import com.example.backend.cmm.dto.ResponseDataDto;
import com.example.backend.cmm.error.exception.BadRequestException;
import com.example.backend.cmm.error.type.ErrorType;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class AdviceController {


    @ExceptionHandler(BadRequestException.class)
    public ResponseDataDto<?> badRequestException(BadRequestException e) {
        return ResponseDataDto.builder()
                .code(ErrorType.REQUEST_ERROR.getErrorCode())
                .message(e.getMessage())
                .build();
    }



}
