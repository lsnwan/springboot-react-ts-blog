package com.example.backend.api.settings;

import com.example.backend.api.settings.form.SettingsForm;
import com.example.backend.cmm.dto.ResponseDataDto;
import com.example.backend.entity.Account;
import com.example.backend.security.CurrentAccount;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/settings")
public class SettingsController {


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

}
