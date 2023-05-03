package com.example.backend.api.blog;

import com.example.backend.api.blog.dto.CreateBlogDto;
import com.example.backend.api.blog.dto.CreateBlogPostDto;
import com.example.backend.cmm.dto.ResponseDataDto;
import com.example.backend.cmm.dto.ResponseDto;
import com.example.backend.cmm.error.exception.BadRequestException;
import com.example.backend.cmm.error.exception.NotFoundDataException;
import com.example.backend.cmm.type.ErrorType;
import com.example.backend.cmm.utils.FileStorageService;
import com.example.backend.entity.*;
import com.example.backend.repository.BlogContentRepository;
import com.example.backend.repository.BlogInfoRepository;
import com.example.backend.repository.BlogTagRepository;
import com.example.backend.repository.FileManagerRepository;
import com.example.backend.security.CurrentAccount;
import com.example.backend.service.blog.BlogService;
import com.example.backend.service.blog.dto.BlogInfoDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.*;

@RestController
@RequestMapping("/blogs")
@RequiredArgsConstructor
@Slf4j
public class BlogController {

    private final BlogInfoRepository blogInfoRepository;
    private final BlogService blogService;
    private final ModelMapper modelMapper;
    private final Environment environment;
    private final FileManagerRepository fileManagerRepository;
    private final BlogContentRepository blogContentRepository;
    private final BlogTagRepository blogTagRepository;

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

        BlogInfo saveBlogInfo = blogService.createBlogInfo(blogInfo);
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

    @PostMapping("/{blogId}/create/image")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> uploadImageFile(@CurrentAccount Account account, @PathVariable String blogId, MultipartFile file) {

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

        String fileDirPath = environment.getProperty("app.files");
        FileStorageService fileStorageService = new FileStorageService(fileDirPath + "/blog-images/" + blogId.substring(1));
        String saveFileName = fileStorageService.storeFile(file);


        FileManager saveFileManager = fileManagerRepository.save(FileManager.builder()
                .savedName(saveFileName)
                .originName(file.getOriginalFilename())
                .size(file.getSize())
                .type(file.getContentType().substring(0, file.getContentType().indexOf("/")))
                .registeredId(account.getId())
                .build());

        Map<String, Object> result = new HashMap<>();
        result.put("fileIdx", saveFileManager.getIdx());
        result.put("imageUrl", environment.getProperty("app.host") + "/files/blog-images/" + blogId.substring(1) + "/" + saveFileName);

        return ResponseEntity.ok().body(
                ResponseDataDto.builder()
                        .code(String.valueOf(HttpStatus.CREATED.value()))
                        .message("정상 처리 되었습니다.")
                        .data(result)
                        .build());
    }

    @PostMapping(value = "/{blogId}/create")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> createBlog(@CurrentAccount Account account, @PathVariable String blogId, MultipartFile file, @Valid CreateBlogPostDto.Request request, BindingResult bindingResult) {

        String thumbnailUrl = null;

        if (file != null) {
            if (!file.getContentType().startsWith("image")) {
                return ResponseEntity.ok().body(
                        ResponseDto.builder()
                                .code(ErrorType.FILE_CONTENT.getErrorCode())
                                .message("이미지 파일만 업로드 가능 합니다.")
                                .build()
                );
            }

            String fileDirPath = environment.getProperty("app.files");
            FileStorageService fileStorageService = new FileStorageService(fileDirPath + "/blog-thumbnail/" + blogId.substring(1));
            String saveFileName = fileStorageService.storeFile(file);
            thumbnailUrl = environment.getProperty("app.host") + "/files/blog-thumbnail/" + blogId.substring(1) + "/" + saveFileName;
        }

        BlogInfo blogInfo = blogInfoRepository.findByBlogPath(blogId.substring(1))
                .orElseThrow(() -> new NotFoundDataException("데이터를 찾을 수 없습니다."));

        BlogContent savedBlogContent = blogContentRepository.save(BlogContent.builder()
                .blogInfo(blogInfo)
                .content(request.getContent())
                .title(request.getTitle())
                .thumbnail(thumbnailUrl)
                .enabled(request.isEnabled())
                .build());

        List<BlogTag> blogTags = new ArrayList<>();
        request.getTags().forEach((tag) ->
                blogTags.add(BlogTag.builder()
                    .blogContent(savedBlogContent)
                    .tagName(tag)
                    .build())
        );

        blogTagRepository.saveAll(blogTags);


        return ResponseEntity.ok().body(
                ResponseDto.builder()
                        .code(String.valueOf(HttpStatus.CREATED.value()))
                        .message("정상 처리 되었습니다.")
                        .path("/" + blogId)
                        .build());
    }

}
