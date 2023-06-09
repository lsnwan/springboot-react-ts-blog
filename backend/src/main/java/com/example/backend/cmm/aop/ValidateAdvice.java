package com.example.backend.cmm.aop;

import com.example.backend.cmm.dto.ResponseDataDto;
import com.example.backend.cmm.type.ErrorType;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import java.util.HashMap;
import java.util.Map;

@Component
@Aspect
@Slf4j
public class ValidateAdvice {

    @Around("execution(* com.example.backend.api..*Controller.*(..))")
    public Object validCheck(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        Object[] args = proceedingJoinPoint.getArgs();

        for (Object arg : args) {
            if (arg instanceof BindingResult) {
                BindingResult bindingResult = (BindingResult) arg;
                if (bindingResult.hasErrors()) {
                    Map<String, Object> errorMap = new HashMap<>();

                    for (FieldError error : bindingResult.getFieldErrors()) {
                        log.debug(error.getField() + "=>" + error.getDefaultMessage());
                        errorMap.put(error.getField(), error.getDefaultMessage());
                    }

                    return ResponseEntity.ok(ResponseDataDto.builder()
                                    .status(HttpStatus.BAD_REQUEST.value())
                                    .code(ErrorType.REQUEST_ERROR.getErrorCode())
                                    .message("잘못된 요청 입니다.")
                                    .data(errorMap)
                                    .build());
                }
            }
        }

        return proceedingJoinPoint.proceed(args);
    }

}
