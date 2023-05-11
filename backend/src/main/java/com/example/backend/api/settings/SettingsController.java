package com.example.backend.api.settings;

import com.example.backend.api.settings.form.ChangeNicknameForm;
import com.example.backend.api.settings.form.SettingsForm;
import com.example.backend.cmm.dto.ResponseDataDto;
import com.example.backend.cmm.dto.ResponseDto;
import com.example.backend.cmm.type.ErrorType;
import com.example.backend.cmm.utils.FileStorageService;
import com.example.backend.entity.Account;
import com.example.backend.repository.AccountRepository;
import com.example.backend.security.CurrentAccount;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;

@RestController
@RequestMapping("/settings")
@RequiredArgsConstructor
@Slf4j
public class SettingsController {

    private final AccountRepository accountRepository;
    private final Environment environment;

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

    @PostMapping("/profile-image")
    public ResponseEntity<?> uploadImageFile(@CurrentAccount Account account, MultipartFile file) {

        if (file.isEmpty()) {
            log.info("파일이 존재하지 않습니다.");
            return ResponseEntity.ok().body(
                    ResponseDto.builder()
                            .code(String.valueOf(ErrorType.REQUEST_ERROR.getErrorCode()))
                            .message("파일이 존재하지 않습니다.")
                            .build());
        }

        String fileDirPath = environment.getProperty("app.files");
        FileStorageService fileStorageService = new FileStorageService(fileDirPath + "/profile-images/" + account.getId());
        String saveFileName = fileStorageService.storeFile(file);
        String profileImagePath = environment.getProperty("app.host") + "/files/profile-images/" + account.getId() + "/" + saveFileName;

        account.setProfilePath(profileImagePath);
        accountRepository.save(account);

        return ResponseEntity.ok().body(
                ResponseDataDto.builder()
                        .code(String.valueOf(HttpStatus.CREATED.value()))
                        .message("정상 처리 되었습니다.")
                        .data(profileImagePath)
                        .build());

    }

    @DeleteMapping("/profile-image")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> deleteBannerImage(@CurrentAccount Account account) {

        account.setProfilePath(null);
        accountRepository.save(account);

        return ResponseEntity.ok().body(
                ResponseDto.builder()
                        .code(String.valueOf(HttpStatus.OK.value()))
                        .message("정상 처리 되었습니다.")
                        .build()
        );
    }

}
