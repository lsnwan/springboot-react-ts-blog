package com.example.backend.api.account;

import com.example.backend.cmm.dto.ResponseDataDto;
import com.example.backend.cmm.dto.ResponseDto;
import com.example.backend.cmm.type.ErrorType;
import com.example.backend.cmm.utils.AES256;
import com.example.backend.entity.Account;
import com.example.backend.security.CurrentAccount;
import com.example.backend.security.dto.LoginDto;
import com.example.backend.security.provider.TokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.util.Map;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/accounts")
@Slf4j
@RequiredArgsConstructor
public class AccountController {

    private final ModelMapper modelMapper;
    private final AES256 aes256;
    private final TokenProvider tokenProvider;


    @PostMapping("/my-info")
    public ResponseEntity<?> getMyInfo(HttpServletResponse response, @CurrentAccount Account account, @RequestBody Map<String, Object> params) {

        if (params.get("userId") == null || account == null) {
            ResponseCookie cookie = ResponseCookie.from("auth_id", "")
                    .maxAge(0)
                    .path("/")
                    .secure(true)
                    .httpOnly(true)
                    .sameSite("None")
                    .domain("localhost")
                    .build();

            response.setHeader("Set-Cookie", cookie.toString());
            return new ResponseEntity<>(ResponseDto.builder()
                    .code(ErrorType.UNAUTHORIZED.getErrorCode())
                    .message("정보를 불러올 수 없습니다.")
                    .build(), HttpStatus.OK);
        }

        LoginDto.Response result = LoginDto.Response.builder()
                .userId(account.getId())
                .userEmail(account.getEmail())
                .userNickname(account.getNickname())
                .profilePath(account.getProfilePath())
                .emailVerifiedConfirmDate(account.getEmailVerifiedConfirmDate())
                .userRole(account.getAuthorities().stream().filter(obj -> obj.getAuthority() != null).map(obj -> obj.getAuthority().getAuthCode()).collect(Collectors.toList()))
                .build();

        return new ResponseEntity<>(ResponseDataDto.<LoginDto.Response>builder()
                .status(HttpStatus.OK.value())
                .code(String.valueOf(HttpStatus.OK.value()))
                .message("성공적으로 조회 했습니다.")
                .data(result)
                .build(), HttpStatus.OK);
    }

}
