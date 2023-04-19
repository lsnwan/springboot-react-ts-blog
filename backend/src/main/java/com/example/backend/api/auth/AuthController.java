package com.example.backend.api.auth;

import com.example.backend.api.auth.dto.SignUpDto;
import com.example.backend.api.auth.dto.VerifiedEmailDto;
import com.example.backend.cmm.dto.ResponseDto;
import com.example.backend.entity.Account;
import com.example.backend.repository.AccountRepository;
import com.example.backend.service.auth.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;
import java.io.PrintWriter;
import java.time.LocalDateTime;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {

    private final AuthService authService;
    private final AccountRepository accountRepository;

    @PostMapping("/logout")
    public ResponseDto logout(HttpServletResponse response) {

        ResponseCookie cookie = ResponseCookie.from("auth_id", "")
                .maxAge(0)
                .path("/")
                .secure(true)
                .httpOnly(true)
                .sameSite("None")
                .domain("localhost")
                .build();

        response.setContentType("application/json");
        response.setHeader("Set-Cookie", cookie.toString());

        return ResponseDto.builder()
                .code(String.valueOf(HttpStatus.OK.value()))
                .message("로그아웃 되었습니다.")
                .build();
    }

    @PostMapping("/sign-up")
    public ResponseEntity<?> signUp(@RequestBody @Valid SignUpDto.Request signUpForm, BindingResult bindingResult) {

        authService.signUp(signUpForm);

        return ResponseEntity.ok(ResponseDto.builder()
                .code(String.valueOf(HttpStatus.CREATED.value()))
                .message("회원가입에 성공 했습니다.")
                .path("/signup-complete")
                .build());
    }

    @GetMapping("/verified-email-check")
    public void verifiedEmailCheck(HttpServletResponse response, VerifiedEmailDto.Request verifiedEmailForm) throws IOException {
        response.setCharacterEncoding("UTF-8");
        response.setContentType("text/html; charset=UTF-8");
        PrintWriter out = response.getWriter();

        Optional<Account> accountOptional = accountRepository.findOneWithAuthoritiesById(verifiedEmailForm.getUid());
        if (accountOptional.isEmpty()) {
            out.println(String.format("<script>alert('%s');window.close();</script>", "인증에 실패했습니다."));
            out.flush();
            return;
        }

        Account account = accountOptional.get();
        if (!account.getEmailVerifiedCode().equals(verifiedEmailForm.getCode())) {
            out.println(String.format("<script>alert('%s');window.close();</script>", "코드가 일치하지 않습니다.\\n인증 메일을 재발송 하십시오"));
            out.flush();
            return;
        }

        LocalDateTime emailVerifiedDate = account.getEmailVerifiedDate().plusDays(7);
        if (emailVerifiedDate.isBefore(LocalDateTime.now())) {
            out.println(String.format("<script>alert('%s');window.close();</script>", "코드 사용기간이 만료되었습니다.\\n인증 메일을 재발송 하십시오"));
            out.flush();
            return;
        }

        account.setEmailVerifiedConfirmDate(LocalDateTime.now());
        accountRepository.save(account);

        out.println(String.format("<script>alert('%s');window.close();</script>", "인증을 완료하였습니다."));
        out.flush();
    }

}
