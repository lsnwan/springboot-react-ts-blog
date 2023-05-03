package com.example.backend.api.blog;

import com.example.backend.api.blog.dto.UpdateEnabledDto;
import com.example.backend.api.blog.dto.UpdateIntroDto;
import com.example.backend.cmm.dto.ResponseDataDto;
import com.example.backend.cmm.dto.ResponseDto;
import com.example.backend.cmm.error.exception.NotFoundDataException;
import com.example.backend.cmm.type.ErrorType;
import com.example.backend.cmm.utils.FileStorageService;
import com.example.backend.entity.Account;
import com.example.backend.entity.BlogInfo;
import com.example.backend.repository.BlogInfoRepository;
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
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/blogs")
@RequiredArgsConstructor
@Slf4j
public class BlogSettingController {

    private final BlogInfoRepository blogInfoRepository;
    private final Environment environment;

    @PostMapping("/{blogId}/settings/intro")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> updateIntroduction(@CurrentAccount Account account, @PathVariable String blogId, @RequestBody @Valid UpdateIntroDto.Request request, BindingResult bindingResult) {

        if (blogId == null || !blogId.startsWith("@")) {
            return ResponseEntity.ok().body(
                    ResponseDto.builder()
                            .code(ErrorType.REQUEST_ERROR.getErrorCode())
                            .message("블로그 주소가 잘못 되었습니다.")
                            .path("/")
                            .build()
            );
        }

        BlogInfo blogInfo = blogInfoRepository.findByBlogPath(blogId.substring(1)).orElseThrow(() -> new NotFoundDataException("데이터를 찾을 수 없습니다."));
        if (!blogInfo.getAccount().getId().equals(account.getId())) {
            return ResponseEntity.ok().body(
                    ResponseDto.builder()
                            .code(ErrorType.UNAUTHORIZED.getErrorCode())
                            .message("본인 블로그만 수정할 수 있습니다.")
                            .build()
            );
        }

        blogInfo.setIntroduction(request.getIntro());
        blogInfoRepository.save(blogInfo);

        return ResponseEntity.ok().body(
                ResponseDto.builder()
                        .code(String.valueOf(HttpStatus.OK.value()))
                        .message("정상 처리 되었습니다.")
                        .build()
        );
    }

    @GetMapping("/{blogId}/settings")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> getSettingsData(@CurrentAccount Account account, @PathVariable String blogId) {

        if (blogId == null || !blogId.startsWith("@")) {
            return ResponseEntity.ok().body(
                    ResponseDto.builder()
                            .code(ErrorType.REQUEST_ERROR.getErrorCode())
                            .message("블로그 주소가 잘못 되었습니다.")
                            .path("/")
                            .build()
            );
        }

        BlogInfo blogInfo = blogInfoRepository.findByBlogPath(blogId.substring(1))
                .orElseThrow(() -> new NotFoundDataException("데이터를 찾을 수 없습니다."));

        if (!blogInfo.getAccount().getId().equals(account.getId())) {
            return ResponseEntity.ok().body(
                    ResponseDto.builder()
                            .code(ErrorType.UNAUTHORIZED.getErrorCode())
                            .message("본인의 블로그만 접근할 수 있습니다.")
                            .path("/")
                            .build()
            );
        }

        Map<String, Object> result = new HashMap<>();
        result.put("intro", blogInfo.getIntroduction());
        result.put("bannerImagePath", blogInfo.getImagePath());
        result.put("enabled", blogInfo.isEnabled());

        return ResponseEntity.ok().body(
                ResponseDataDto.builder()
                        .code(String.valueOf(HttpStatus.OK.value()))
                        .message("정상 처리 되었습니다.")
                        .data(result)
                        .build()
        );

    }

    @PostMapping("/{blogId}/settings/enabled")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> changeBlogEnabled(@CurrentAccount Account account, @PathVariable String blogId, @RequestBody UpdateEnabledDto.Request request) {

        if (blogId == null || !blogId.startsWith("@")) {
            return ResponseEntity.ok().body(
                    ResponseDto.builder()
                            .code(ErrorType.REQUEST_ERROR.getErrorCode())
                            .message("블로그 주소가 잘못 되었습니다.")
                            .path("/")
                            .build()
            );
        }

        BlogInfo blogInfo = blogInfoRepository.findByBlogPath(blogId.substring(1))
                .orElseThrow(() -> new NotFoundDataException("데이터를 찾을 수 없습니다."));

        if (!blogInfo.getAccount().getId().equals(account.getId())) {
            return ResponseEntity.ok().body(
                    ResponseDto.builder()
                            .code(ErrorType.UNAUTHORIZED.getErrorCode())
                            .message("본인의 블로그만 접근할 수 있습니다.")
                            .path("/")
                            .build()
            );
        }

        blogInfo.setEnabled(request.isEnabled());
        blogInfoRepository.save(blogInfo);

        return ResponseEntity.ok().body(
                ResponseDto.builder()
                        .code(String.valueOf(HttpStatus.OK.value()))
                        .message("정상 처리 되었습니다.")
                        .build()
        );

    }

    @PostMapping("/{blogId}/settings/banner")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> updateBannerImage(@CurrentAccount Account account, @PathVariable String blogId, MultipartFile file) {

        if (file.isEmpty()) {
            log.info("파일이 존재하지 않습니다.");
            return ResponseEntity.ok().body(
                    ResponseDto.builder()
                            .code(String.valueOf(ErrorType.REQUEST_ERROR.getErrorCode()))
                            .message("파일이 존재하지 않습니다.")
                            .build());
        }

        if (blogId == null || !blogId.startsWith("@")) {
            return ResponseEntity.ok().body(
                    ResponseDto.builder()
                            .code(ErrorType.REQUEST_ERROR.getErrorCode())
                            .message("블로그 주소가 잘못 되었습니다.")
                            .path("/")
                            .build()
            );
        }

        if (!file.getContentType().startsWith("image")) {
            return ResponseEntity.ok().body(
                    ResponseDto.builder()
                            .code(ErrorType.FILE_CONTENT.getErrorCode())
                            .message("이미지 파일만 업로드 가능 합니다.")
                            .build()
            );
        }

        BlogInfo blogInfo = blogInfoRepository.findByBlogPath(blogId.substring(1))
                .orElseThrow(() -> new NotFoundDataException("데이터를 찾을 수 없습니다."));

        if (!blogInfo.getAccount().getId().equals(account.getId())) {
            return ResponseEntity.ok().body(
                    ResponseDto.builder()
                            .code(ErrorType.UNAUTHORIZED.getErrorCode())
                            .message("본인의 블로그만 접근할 수 있습니다.")
                            .path("/")
                            .build()
            );
        }

        /*
         ! 파일 저장
         */
        String fileDirPath = environment.getProperty("app.files");
        FileStorageService fileStorageService = new FileStorageService(fileDirPath + "/banners/" + blogInfo.getBlogPath());
        String saveFileName = fileStorageService.storeFile(file);
        String bannerImagePath = environment.getProperty("app.host") + "/files/banners/" + blogInfo.getBlogPath() + "/" + saveFileName;

        blogInfo.setImagePath(bannerImagePath);
        blogInfoRepository.save(blogInfo);


        Map<String, Object> result = new HashMap<>();
        result.put("bannerImagePath", bannerImagePath);
        return ResponseEntity.ok().body(
                ResponseDataDto.builder()
                        .code(String.valueOf(HttpStatus.OK.value()))
                        .message("정상 처리 되었습니다.")
                        .data(result)
                        .build());

    }

    @DeleteMapping("/{blogId}/settings/banner")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> deleteBannerImage(@CurrentAccount Account account, @PathVariable String blogId) {
        if (blogId == null || !blogId.startsWith("@")) {
            return ResponseEntity.ok().body(
                    ResponseDto.builder()
                            .code(ErrorType.REQUEST_ERROR.getErrorCode())
                            .message("블로그 주소가 잘못 되었습니다.")
                            .path("/")
                            .build()
            );
        }

        BlogInfo blogInfo = blogInfoRepository.findByBlogPath(blogId.substring(1))
                .orElseThrow(() -> new NotFoundDataException("데이터를 찾을 수 없습니다."));

        if (!blogInfo.getAccount().getId().equals(account.getId())) {
            return ResponseEntity.ok().body(
                    ResponseDto.builder()
                            .code(ErrorType.UNAUTHORIZED.getErrorCode())
                            .message("본인의 블로그만 접근할 수 있습니다.")
                            .path("/")
                            .build()
            );
        }

        blogInfo.setImagePath(null);
        blogInfoRepository.save(blogInfo);

        return ResponseEntity.ok().body(
                ResponseDto.builder()
                        .code(String.valueOf(HttpStatus.OK.value()))
                        .message("정상 처리 되었습니다.")
                        .build()
        );
    }
}
