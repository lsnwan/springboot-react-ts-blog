package com.example.backend.api.blog;

import com.example.backend.api.blog.dto.CreateBlogDto;
import com.example.backend.cmm.dto.ResponseDataDto;
import com.example.backend.cmm.dto.ResponseDto;
import com.example.backend.cmm.error.exception.BadRequestException;
import com.example.backend.cmm.type.ErrorType;
import com.example.backend.entity.Account;
import com.example.backend.entity.BlogInfo;
import com.example.backend.repository.BlogInfoRepository;
import com.example.backend.security.CurrentAccount;
import com.example.backend.service.blog.BlogInfoService;
import com.example.backend.service.blog.dto.BlogInfoDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("/blogs")
@RequiredArgsConstructor
@Slf4j
public class BlogInfoController {

    private final BlogInfoRepository blogInfoRepository;
    private final BlogInfoService blogInfoService;
    private final ModelMapper modelMapper;

    @GetMapping("/check")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> blogCheck(@CurrentAccount Account account) {

        Optional<BlogInfo> blogInfoOpt = blogInfoRepository.findByAccount(account);
        return
                blogInfoOpt.map(blogInfo -> ResponseEntity.ok().body(
                ResponseDto.builder()
                        .code(String.valueOf(HttpStatus.OK.value()))
                        .message("정상 처리 되었습니다.")
                        .path("/@" + blogInfo.getBlogPath())
                        .build()
                )).orElseGet(() -> ResponseEntity.ok().body(
                        ResponseDto.builder()
                                .code(ErrorType.NOT_FOUND_DATA.getErrorCode())
                                .message("데이터를 찾을 수 없습니다.")
                                .build()
        ));
    }

    @PostMapping("")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> createBlog(@CurrentAccount Account account, @RequestBody @Valid CreateBlogDto.Request createBlogForm, BindingResult bindingResult) {

        Map<String, Object> errorMap = new HashMap<>();
        String blogPath = createBlogForm.getBlogPath();
        if (blogPath.startsWith("-") || Character.isDigit(blogPath.charAt(0))) {
            errorMap.put("blogPath", "'-' 또는 숫자로 시작할 수 없습니다.");
            throw new BadRequestException("잘못된 요청 입니다.", errorMap);
        }

        if (blogInfoRepository.existsByBlogPath(createBlogForm.getBlogPath())) {
            errorMap.put("blogPath", "이미 존재하는 아이디 입니다.");
            throw new BadRequestException("잘못된 요청 입니다.", errorMap);
        }

        /*
         ! 블로그 정보 저장
         */
        BlogInfo blogInfo = modelMapper.map(createBlogForm, BlogInfo.class);
        blogInfo.setAccount(account);

        BlogInfo saveBlogInfo = blogInfoService.createBlogInfo(blogInfo);
        return ResponseEntity.ok().body(
                ResponseDto.builder()
                        .code(String.valueOf(HttpStatus.CREATED.value()))
                        .message("정상 처리 되었습니다.")
                        .path("/@" + saveBlogInfo.getBlogPath())
                        .build()
        );
    }

    @GetMapping("/{blogId}/info")
    public ResponseEntity<?> getBlogInfo(@CurrentAccount Account account, @PathVariable String blogId) {

        BlogInfoDto blogInfo = blogInfoService.getBlogInfo(blogId.substring(1));
        if (Objects.isNull(blogInfo)) {
            return ResponseEntity.ok().body(
                    ResponseDto.builder()
                            .code(ErrorType.NOT_FOUND_DATA.getErrorCode())
                            .message("데이터가 존재하지 않습니다.")
                            .path("/")
                            .build()
            );
        }

        /*
         ! 로그인 사용자 본인 블로그인지 체크
         */
        if (account != null) {
            if (account.getId().equals(blogInfo.getAccountId())) {
                blogInfo.setBlogOwner(true);
            }
        }

        return ResponseEntity.ok().body(
                ResponseDataDto.builder()
                        .code(String.valueOf(HttpStatus.OK.value()))
                        .message("정상 처리 되었습니다.")
                        .data(blogInfo)
                        .build()
        );
    }

}
