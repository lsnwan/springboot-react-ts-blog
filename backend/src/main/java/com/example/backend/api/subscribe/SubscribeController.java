package com.example.backend.api.subscribe;

import com.example.backend.cmm.dto.ResponseDto;
import com.example.backend.cmm.type.ErrorType;
import com.example.backend.entity.Account;
import com.example.backend.entity.Subscribe;
import com.example.backend.repository.SubscribeRepository;
import com.example.backend.security.CurrentAccount;
import com.example.backend.service.account.AccountService;
import com.example.backend.service.blog.BlogService;
import com.example.backend.service.blog.dto.BlogInfoDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
@RequiredArgsConstructor
@RequestMapping("/subscribe")
public class SubscribeController {

    private final BlogService blogService;
    private final AccountService accountService;
    private final SubscribeRepository subscribeRepository;

    @PostMapping("/{blogPath}/{toAccountId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> registeredSubscribe(@CurrentAccount Account account, @PathVariable String blogPath, @PathVariable String toAccountId) {

        BlogInfoDto blogInfo = blogService.getBlogInfo(blogPath.substring(1));
        if (Objects.isNull(blogInfo)) {
            return ResponseEntity.ok().body(
                    ResponseDto.builder()
                            .code(ErrorType.NOT_FOUND_DATA.getErrorCode())
                            .message("블로그가 존재하지 않습니다.")
                            .path("/")
                            .build()
            );
        }

        Account toAccount = accountService.getAccount(toAccountId);

        if (toAccount == null) {
            return ResponseEntity.ok().body(
                    ResponseDto.builder()
                            .code(ErrorType.NOT_FOUND_DATA.getErrorCode())
                            .message("존재하지 않는 계정 입니다.")
                            .path("/")
                            .build()
            );
        }

        if (!toAccount.isEnabled()) {
            return ResponseEntity.ok().body(
                    ResponseDto.builder()
                            .code(ErrorType.PRIVATE_DATA.getErrorCode())
                            .message("사용이 중지된 사용자입니다.")
                            .path("/")
                            .build()
            );
        }

        subscribeRepository.save(Subscribe.builder()
                .fromAccount(account)
                .toAccount(toAccount)
                .build());

        return ResponseEntity.ok().body(
                ResponseDto.builder()
                        .code(String.valueOf(HttpStatus.CREATED.value()))
                        .message("정상 처리 되었습니다.")
                        .build());
    }


    @DeleteMapping("/{blogPath}/{toAccountId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> deletedSubscribe(@CurrentAccount Account account, @PathVariable String blogPath, @PathVariable String toAccountId) {

        BlogInfoDto blogInfo = blogService.getBlogInfo(blogPath.substring(1));
        if (Objects.isNull(blogInfo)) {
            return ResponseEntity.ok().body(
                    ResponseDto.builder()
                            .code(ErrorType.NOT_FOUND_DATA.getErrorCode())
                            .message("블로그가 존재하지 않습니다.")
                            .path("/")
                            .build()
            );
        }

        Account toAccount = accountService.getAccount(toAccountId);

        if (toAccount == null) {
            return ResponseEntity.ok().body(
                    ResponseDto.builder()
                            .code(ErrorType.NOT_FOUND_DATA.getErrorCode())
                            .message("존재하지 않는 계정 입니다.")
                            .path("/")
                            .build()
            );
        }

        if (!toAccount.isEnabled()) {
            return ResponseEntity.ok().body(
                    ResponseDto.builder()
                            .code(ErrorType.PRIVATE_DATA.getErrorCode())
                            .message("사용이 중지된 사용자입니다.")
                            .path("/")
                            .build()
            );
        }

        subscribeRepository.delete(subscribeRepository.findByFromAccountAndToAccount(account, toAccount));

        return ResponseEntity.ok().body(
                ResponseDto.builder()
                        .code(String.valueOf(HttpStatus.CREATED.value()))
                        .message("정상 처리 되었습니다.")
                        .build());
    }

}
