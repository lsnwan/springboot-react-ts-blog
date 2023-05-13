package com.example.backend.api.auth;

import com.example.backend.api.auth.form.FindPasswordForm;
import com.example.backend.api.auth.form.SignUpForm;
import com.example.backend.api.auth.form.VerifiedEmailForm;
import com.example.backend.cmm.dto.ResponseDto;
import com.example.backend.cmm.type.ErrorType;
import com.example.backend.cmm.utils.CommonUtils;
import com.example.backend.entity.Account;
import com.example.backend.entity.FindAccount;
import com.example.backend.repository.AccountRepository;
import com.example.backend.repository.FindAccountRepository;
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
    private final FindAccountRepository findAccountRepository;

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
    public ResponseEntity<?> signUp(@RequestBody @Valid SignUpForm.Request signUpForm, BindingResult bindingResult) {

        authService.signUp(signUpForm);

        return ResponseEntity.ok(ResponseDto.builder()
                .code(String.valueOf(HttpStatus.CREATED.value()))
                .message("회원가입에 성공 했습니다.")
                .path("/signup-complete")
                .build());
    }

    @GetMapping("/verified-email-check")
    public void verifiedEmailCheck(HttpServletResponse response, VerifiedEmailForm.Request verifiedEmailForm) throws IOException {
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

    @PostMapping("/find-password")
    public ResponseEntity<?> findPassword(@RequestBody @Valid FindPasswordForm.Request findPasswordForm, BindingResult bindingResult) {

        log.info("비밀번호 찾기");

        Optional<Account> optAccount = accountRepository.findOneWithAuthoritiesByEmail(findPasswordForm.getEmail());
        if (optAccount.isEmpty()) {
            return ResponseEntity.ok(ResponseDto.builder()
                            .code(ErrorType.NOT_FOUND_DATA.getErrorCode())
                            .message("데이터를 찾을 수 없습니다.")
                            .build());
        }

        FindAccount findAccount = findAccountRepository.findFirstByEmailOrderByRegisteredDateDesc(findPasswordForm.getEmail());
        if (findAccount != null) {
            if (findAccount.getRegisteredDate().plusHours(1L).isAfter(LocalDateTime.now())) {
                return ResponseEntity.ok(ResponseDto.builder()
                                .code(ErrorType.NO_RESPONSE_TIME.getErrorCode())
                                .message("재전송은 1시간 후에 가능 합니다.")
                        .build());
            }
        }



        authService.findPassword(findPasswordForm.getEmail(), optAccount.get(), CommonUtils.getClientIp());



        return ResponseEntity.ok(ResponseDto.builder()
                        .code(String.valueOf(HttpStatus.OK.value()))
                        .message("임시 비밀번호 발급이 완료되었습니다.")
                        .path("/find-password-complete")
                .build());
    }

}
