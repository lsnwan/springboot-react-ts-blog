package com.example.backend.api.account;

import com.example.backend.cmm.dto.ResponseDataDto;
import com.example.backend.cmm.dto.ResponseDto;
import com.example.backend.cmm.error.exception.BadTokenException;
import com.example.backend.cmm.error.exception.DecryptionErrorException;
import com.example.backend.cmm.type.ErrorType;
import com.example.backend.cmm.utils.AES256;
import com.example.backend.cmm.utils.CommonUtils;
import com.example.backend.entity.Account;
import com.example.backend.entity.AccountAuthority;
import com.example.backend.security.CurrentAccount;
import com.example.backend.security.dto.LoginDto;
import com.example.backend.security.provider.TokenProvider;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.thymeleaf.util.StringUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Map;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/accounts")
@Slf4j
@RequiredArgsConstructor
public class AccountController {

    @Value("${jwt.secret}")
    private String secret;

    private final ModelMapper modelMapper;
    private final AES256 aes256;
    private final TokenProvider tokenProvider;


    @PostMapping("/my-info")
    public ResponseEntity<?> getMyInfo(HttpServletRequest request, HttpServletResponse response, @CurrentAccount Account account, @RequestBody Map<String, Object> params) {

        if (params.get("userId") == null || account == null) {
//            CommonUtils.deleteCookie(response, "auth_id");
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
