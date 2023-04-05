package com.example.backend.api.test;

import com.example.backend.cmm.domain.ResponseDto;
import com.example.backend.entity.Account;
import com.example.backend.security.CurrentAccount;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
@Slf4j
public class TestController {

    @GetMapping("/get")
    public ResponseDto<Object> test() {
        return ResponseDto.builder()
                .code("T001")
                .message("HelloWorld")
                .data("HelloWorld")
                .build();
    }

    @PostMapping("/post")
    public String testPost() {
        return "hello world!!! POST!!!";
    }

    @GetMapping("/admin-role")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public String adminRole(@CurrentAccount Account account) {
        return account.getEmail() + "관리자 권한이 있으시군요";
    }

    @GetMapping("/user-role")
    @PreAuthorize("hasAnyRole('USER')")
    public String userRole(@CurrentAccount Account account) {
        log.info("");
        return account.getEmail() +  "님은 유저 권한이 있으시군요";
    }

    @GetMapping("/all-role")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public String allRole() {
        return "모든 권한이 있으시군요";
    }

}
