package com.example.backend.api.blog;

import com.example.backend.api.blog.dto.BlogCardDto;
import com.example.backend.cmm.dto.CommonDto;
import com.example.backend.cmm.dto.ResponseDataDto;
import com.example.backend.cmm.dto.ResponseDto;
import com.example.backend.cmm.type.ErrorType;
import com.example.backend.entity.Account;
import com.example.backend.security.CurrentAccount;
import com.example.backend.service.blog.BlogService;
import com.example.backend.service.blog.dto.BlogContentDto;
import com.example.backend.service.blog.dto.BlogContentRegisteredDto;
import com.example.backend.service.blog.dto.BlogInfoDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/blogs")
@RequiredArgsConstructor
@Slf4j
public class BlogReadController {

    private final BlogService blogService;


    @PostMapping("/{blogId}/recent")
    public ResponseEntity<?> getMyBlogHome(@CurrentAccount Account account, @PathVariable String blogId, @RequestBody @Valid CommonDto.Request request) {

        if (blogId == null || !blogId.startsWith("@")) {
            return ResponseEntity.ok().body(
                    ResponseDto.builder()
                            .code(ErrorType.REQUEST_ERROR.getErrorCode())
                            .message("블로그 주소가 잘못 되었습니다.")
                            .path("/")
                            .build()
            );
        }

        BlogInfoDto blogInfo = blogService.getBlogInfo(blogId.substring(1));
        if (Objects.isNull(blogInfo)) {
            return ResponseEntity.ok().body(
                    ResponseDto.builder()
                            .code(ErrorType.NOT_FOUND_DATA.getErrorCode())
                            .message("데이터가 존재하지 않습니다.")
                            .path("/")
                            .build()
            );
        }

        if (!blogInfo.isEnabled()) {
            return ResponseEntity.ok().body(
                    ResponseDto.builder()
                            .code(ErrorType.PRIVATE_DATA.getErrorCode())
                            .message("비공개 블로그 입니다.")
                            .path("/")
                            .build()
            );
        }

        if (account != null) {
            if (account.getId().equals(blogInfo.getAccountId())) {
                blogInfo.setBlogOwner(true);
            }
        }

        List<BlogContentDto> blogContent = blogService.getBlogContent(blogId.substring(1), request.getPageIndex(), request.getPageUnit(), blogInfo.isBlogOwner());
        log.info(blogContent.toString());

        List<BlogContentRegisteredDto> blogRegisteredCalendar = blogService.getBlogRegisteredCalendar(blogId.substring(1), blogInfo.isBlogOwner());
        log.info(blogRegisteredCalendar.toString());

        Map<String, Object> result = new HashMap<>();
        result.put("blogContents", blogContent);
        result.put("calendar", blogRegisteredCalendar);

        return ResponseEntity.ok().body(
                ResponseDataDto.builder()
                        .code(String.valueOf(HttpStatus.OK.value()))
                        .message("정상 처리 되었습니다.")
                        .data(result)
                        .build());
    }

    @PostMapping("/{blogId}/published")
    public ResponseEntity<?> getMyBlogPublished(@CurrentAccount Account account, @PathVariable String blogId, @RequestBody @Valid CommonDto.Request request) {

        if (blogId == null || !blogId.startsWith("@")) {
            return ResponseEntity.ok().body(
                    ResponseDto.builder()
                            .code(ErrorType.REQUEST_ERROR.getErrorCode())
                            .message("블로그 주소가 잘못 되었습니다.")
                            .path("/")
                            .build()
            );
        }

        BlogInfoDto blogInfo = blogService.getBlogInfo(blogId.substring(1));
        if (Objects.isNull(blogInfo)) {
            return ResponseEntity.ok().body(
                    ResponseDto.builder()
                            .code(ErrorType.NOT_FOUND_DATA.getErrorCode())
                            .message("데이터가 존재하지 않습니다.")
                            .path("/")
                            .build()
            );
        }

        if (!blogInfo.isEnabled()) {
            return ResponseEntity.ok().body(
                    ResponseDto.builder()
                            .code(ErrorType.PRIVATE_DATA.getErrorCode())
                            .message("비공개 블로그 입니다.")
                            .path("/")
                            .build()
            );
        }

        if (account != null) {
            if (account.getId().equals(blogInfo.getAccountId())) {
                blogInfo.setBlogOwner(true);
            }
        }

        List<BlogContentDto> blogContent = blogService.getBlogContent(blogId.substring(1), request.getPageIndex(), request.getPageUnit(), blogInfo.isBlogOwner());
        log.info(blogContent.toString());

        return ResponseEntity.ok().body(
                ResponseDataDto.builder()
                        .code(String.valueOf(HttpStatus.OK.value()))
                        .message("정상 처리 되었습니다.")
                        .data(blogContent)
                        .build());
    }

}
