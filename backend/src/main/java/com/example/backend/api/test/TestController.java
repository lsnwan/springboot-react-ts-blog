package com.example.backend.api.test;

import com.example.backend.cmm.dto.ResponseDataDto;
import com.example.backend.cmm.dto.ResponseDto;
import com.example.backend.cmm.error.exception.DecryptionErrorException;
import com.example.backend.cmm.utils.AES256;
import com.example.backend.cmm.utils.CommonUtils;
import com.example.backend.entity.Account;
import com.example.backend.security.CurrentAccount;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/test")
@Slf4j
@RequiredArgsConstructor
public class TestController {

    @Value("${jasypt.password}")
    private String password;

    @Value("${aes256.key}")
    private String key;

    private final AES256 aes256;


    @GetMapping("/get")
    public ResponseDataDto<Object> test() {
        return ResponseDataDto.builder()
                .code("T001")
                .message("HelloWorld")
                .data("HelloWorld")
                .build();
    }

    @PostMapping("/post")
    @PreAuthorize("isAuthenticated()")
    public String testPost() {
        log.info("jasypt 비밀번호 : " + password);
        log.info("aes 키 : " + key);

        try {
            String encryptString = aes256.encrypt("gkwkgkwkgkwk");
            log.info(encryptString);
        } catch (Exception e) {
            e.printStackTrace();
        }



        return "hello world!!! POST!!!";
    }

    @GetMapping("/get-cookie")
    @PreAuthorize("hasAnyRole('USER')")
    public Map<String, Object> getCookie(HttpServletRequest request) {
        log.info("토큰 가져오기!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        Map<String, Object> result = new HashMap<>();

        try {
            result.put("auth_token", CommonUtils.getCookie(request, "auth_token"));
            result.put("msg", "토큰이 있어영");
            return result;
        } catch (NullPointerException e) {
            result.put("msg", "토큰이 존재하지 않아요");
            return result;
        }

    }

    @GetMapping("/admin-role")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public String adminRole(@CurrentAccount Account account) {
        return account.getEmail() + "님은 관리자 권한이 있으시군요";
    }

    @GetMapping("/user-role")
    @PreAuthorize("hasAnyRole('USER')")
    public String userRole(@CurrentAccount Account account) {
        return account.getEmail() +  "님은 유저 권한이 있으시군요";
    }

    @GetMapping("/all-role")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public String allRole() {
        return "모든 권한이 있으시군요";
    }

    @GetMapping("/exception")
    public ResponseDto testException() {
        throw new DecryptionErrorException("[테스트 익셉션] DecryptionErrorException");
    }
}
