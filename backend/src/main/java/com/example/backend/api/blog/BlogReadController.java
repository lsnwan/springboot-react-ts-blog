package com.example.backend.api.blog;

import com.example.backend.cmm.dto.CommonDto;
import com.example.backend.cmm.dto.ResponseDataDto;
import com.example.backend.cmm.dto.ResponseDto;
import com.example.backend.cmm.type.ErrorType;
import com.example.backend.entity.Account;
import com.example.backend.entity.BlogContent;
import com.example.backend.entity.BlogFavorite;
import com.example.backend.repository.BlogFavoriteRepository;
import com.example.backend.repository.SubscribeRepository;
import com.example.backend.security.CurrentAccount;
import com.example.backend.service.account.AccountService;
import com.example.backend.service.blog.BlogService;
import com.example.backend.service.blog.dto.BlogContentDto;
import com.example.backend.service.blog.dto.BlogContentRegisteredDto;
import com.example.backend.service.blog.dto.BlogContentViewDto;
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
    private final AccountService accountService;
    private final SubscribeRepository subscribeRepository;
    private final BlogFavoriteRepository blogFavoriteRepository;

    @PostMapping("/{blogPath}/recent")
    public ResponseEntity<?> getMyBlogHome(@CurrentAccount Account account, @PathVariable String blogPath, @RequestBody @Valid CommonDto.Request request) {

        BlogInfoDto blogInfo = blogService.getBlogInfo(blogPath.substring(1));
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

        List<BlogContentDto> blogContent = blogService.getBlogContent(blogPath.substring(1), request.getPageIndex(), request.getPageUnit(), blogInfo.isBlogOwner());
        log.info(blogContent.toString());

        List<BlogContentRegisteredDto> blogRegisteredCalendar = blogService.getBlogRegisteredCalendar(blogPath.substring(1), blogInfo.isBlogOwner());
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

    @PostMapping("/{blogPath}/published")
    public ResponseEntity<?> getMyBlogPublished(@CurrentAccount Account account, @PathVariable String blogPath, @RequestBody @Valid CommonDto.Request request) {

        BlogInfoDto blogInfo = blogService.getBlogInfo(blogPath.substring(1));
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

        List<BlogContentDto> blogContent = blogService.getBlogContent(blogPath.substring(1), request.getPageIndex(), request.getPageUnit(), blogInfo.isBlogOwner());
        log.info(blogContent.toString());

        return ResponseEntity.ok().body(
                ResponseDataDto.builder()
                        .code(String.valueOf(HttpStatus.OK.value()))
                        .message("정상 처리 되었습니다.")
                        .data(blogContent)
                        .build());
    }

    @GetMapping("/{blogPath}/view")
    public ResponseEntity<?> getBlogView(@CurrentAccount Account account, @PathVariable String blogPath, Long id) {

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

        if (!blogInfo.isEnabled()) {
            return ResponseEntity.ok().body(
                    ResponseDto.builder()
                            .code(ErrorType.PRIVATE_DATA.getErrorCode())
                            .message("비공개 블로그 입니다.")
                            .path("/")
                            .build()
            );
        }

        /*
         ! 로그인 사용자 본인 블로그인지 체크 & 구독 여부 체크
         */
        if (account != null) {
            if (account.getId().equals(blogInfo.getAccountId())) {
                blogInfo.setBlogOwner(true);
            }

            // 구독 정보
            Account toAccount = accountService.getAccount(blogInfo.getAccountId());
            if (toAccount != null) {
                blogInfo.setSubscribed(subscribeRepository.existsByFromAccountAndToAccount(account, toAccount));
            }

        }

        Map<String, Object> resultService = blogService.getBlogContentView(account != null ? account : null, blogPath.substring(1), id, blogInfo.isBlogOwner());
        BlogContentViewDto blogContentView = (BlogContentViewDto) resultService.get("blogContentViewDto");
        if (blogContentView == null) {
            return ResponseEntity.ok().body(
                    ResponseDto.builder()
                            .code(ErrorType.NOT_FOUND_DATA.getErrorCode())
                            .message("존재하지 않는 게시글 입니다.")
                            .path("/")
                            .build()
            );
        }

        // 즐겨찾기 정보
        blogContentView.setBlogOwner(blogInfo.isBlogOwner());
        blogContentView.setFavorite(blogFavoriteRepository.existsByAccountAndBlogContent(account, (BlogContent) resultService.get("blogContent")));
        blogContentView.setSubscribed(blogInfo.isSubscribed());

        return ResponseEntity.ok().body(
                ResponseDataDto.builder()
                        .code(String.valueOf(HttpStatus.OK.value()))
                        .message("정상 처리 되었습니다.")
                        .data(blogContentView)
                        .build());
    }

}
