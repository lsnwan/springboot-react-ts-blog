package com.example.backend.cmm.aop;

import com.example.backend.cmm.dto.ResponseDto;
import com.example.backend.cmm.type.ErrorType;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.servlet.HandlerMapping;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@Component
@Aspect
@Slf4j
public class BlogValidateAdvice {

    @Around("execution(* com.example.backend.api..*Controller.*(..))")
    public Object BlogValidCheck (ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        Object[] args = proceedingJoinPoint.getArgs();

        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
        Map<?, ?> pathVariable = (Map<?, ?>) request.getAttribute(HandlerMapping.URI_TEMPLATE_VARIABLES_ATTRIBUTE);

        if (pathVariable.get("blogPath") != null) {
            String blogPath = (String) pathVariable.get("blogPath");

            if (blogPath == null || !blogPath.startsWith("@")) {
                return ResponseEntity.ok().body(
                        ResponseDto.builder()
                                .code(ErrorType.REQUEST_ERROR.getErrorCode())
                                .message("블로그 주소가 잘못 되었습니다.")
                                .path("/")
                                .build()
                );
            }
        }

        return proceedingJoinPoint.proceed(args);
    }

}
