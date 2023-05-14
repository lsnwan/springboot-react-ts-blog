package com.example.backend.api.favorite;

import com.example.backend.api.blog.form.RegisteredFavoriteForm;
import com.example.backend.cmm.dto.ResponseDto;
import com.example.backend.cmm.type.ErrorType;
import com.example.backend.entity.Account;
import com.example.backend.entity.BlogContent;
import com.example.backend.entity.BlogFavorite;
import com.example.backend.repository.BlogFavoriteRepository;
import com.example.backend.security.CurrentAccount;
import com.example.backend.service.blog.BlogService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/favorite")
public class FavoriteController {

    private final BlogService blogService;
    private final BlogFavoriteRepository blogFavoriteRepository;


    @PostMapping("/{blogPath}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> registeredFavorite(@CurrentAccount Account account, @PathVariable String blogPath, @RequestBody RegisteredFavoriteForm.Request request) {

        BlogContent blogContent = blogService.getBlogContentView(blogPath.substring(1), Long.valueOf(request.getBlogContentIdx()));

        if (blogContent == null) {
            return ResponseEntity.ok().body(
                    ResponseDto.builder()
                            .code(ErrorType.NOT_FOUND_DATA.getErrorCode())
                            .message("존재하지 않는 게시글 입니다.")
                            .build());
        }

        if (!blogContent.isEnabled()) {
            return ResponseEntity.ok().body(
                    ResponseDto.builder()
                            .code(ErrorType.PRIVATE_DATA.getErrorCode())
                            .message("비공개 블로그 입니다.")
                            .path("/")
                            .build()
            );
        }

        boolean existedFavorite = blogFavoriteRepository.existsByAccountAndBlogContent(account, blogContent);
        if (existedFavorite) {
            return ResponseEntity.ok().body(
                    ResponseDto.builder()
                            .code(ErrorType.DUPLICATE_DATA.getErrorCode())
                            .message("이미 즐겨찾기한 게시글 입니다.")
                            .build()
            );
        }

        blogFavoriteRepository.save(BlogFavorite.builder()
                .account(account)
                .blogContent(blogContent)
                .build());

        return ResponseEntity.ok().body(
                ResponseDto.builder()
                        .code(String.valueOf(HttpStatus.CREATED.value()))
                        .message("정상 처리 되었습니다.")
                        .build());
    }

    @DeleteMapping("/{blogPath}/{blogContentId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> deletedFavorite(@CurrentAccount Account account, @PathVariable String blogPath, @PathVariable Long blogContentId) {
        BlogContent blogContent = blogService.getBlogContentView(blogPath.substring(1), blogContentId);

        if (blogContent == null) {
            return ResponseEntity.ok().body(
                    ResponseDto.builder()
                            .code(ErrorType.NOT_FOUND_DATA.getErrorCode())
                            .message("존재하지 않는 게시글 입니다.")
                            .build());
        }

        if (!blogContent.isEnabled()) {
            return ResponseEntity.ok().body(
                    ResponseDto.builder()
                            .code(ErrorType.PRIVATE_DATA.getErrorCode())
                            .message("비공개 블로그 입니다.")
                            .path("/")
                            .build()
            );
        }

        blogFavoriteRepository.delete(blogFavoriteRepository.findByAccountAndBlogContent(account, blogContent));

        return ResponseEntity.ok().body(
                ResponseDto.builder()
                        .code(String.valueOf(HttpStatus.OK.value()))
                        .message("정상 처리 되었습니다.")
                        .build());
    }

}
