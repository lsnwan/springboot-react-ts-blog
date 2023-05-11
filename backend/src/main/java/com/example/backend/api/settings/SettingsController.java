package com.example.backend.api.settings;

import com.example.backend.api.settings.form.ChangeNicknameForm;
import com.example.backend.api.settings.form.SettingsForm;
import com.example.backend.cmm.dto.ResponseDataDto;
import com.example.backend.cmm.dto.ResponseDto;
import com.example.backend.entity.Account;
import com.example.backend.repository.AccountRepository;
import com.example.backend.security.CurrentAccount;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/settings")
@RequiredArgsConstructor
public class SettingsController {

    private final AccountRepository accountRepository;


    @GetMapping("")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> settings(@CurrentAccount Account account) {

        return ResponseEntity.ok().body(
                ResponseDataDto.builder()
                        .code(String.valueOf(HttpStatus.OK.value()))
                        .message("정상 처리 되었습니다.")
                        .data(SettingsForm.Response.builder()
                                .id(account.getId())
                                .nickname(account.getNickname())
                                .profilePath(account.getProfilePath())
                                .build())
                        .build());
    }


    @PostMapping("/nickname")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> changeNickname(@CurrentAccount Account account, @RequestBody @Valid ChangeNicknameForm.Request request, BindingResult bindingResult) {

        account.setNickname(request.getNickname());
        accountRepository.save(account);

        return ResponseEntity.ok().body(
                ResponseDto.builder()
                        .code(String.valueOf(HttpStatus.OK.value()))
                        .message("정상 처리 되었습니다.")
                        .build()
        );
    }

}
