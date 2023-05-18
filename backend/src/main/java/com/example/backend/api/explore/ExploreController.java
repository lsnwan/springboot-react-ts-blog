package com.example.backend.api.explore;

import com.example.backend.cmm.dto.CommonDto;
import com.example.backend.cmm.dto.ResponseDataDto;
import com.example.backend.service.blog.BlogService;
import com.example.backend.service.blog.dto.BlogContentDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/explore")
@RequiredArgsConstructor
@Slf4j
public class ExploreController {

    private final BlogService blogService;


    @GetMapping("")
    public ResponseEntity<?> exploreBlogContent(@ModelAttribute @Valid CommonDto.Request request, BindingResult bindingResult) {

        List<BlogContentDto> blogContents = blogService.getBlogContent(null, request.getPageIndex(), request.getPageUnit(), false, request.getCondition().toUpperCase(), null, null);

        return ResponseEntity.ok().body(
                ResponseDataDto.builder()
                        .code(String.valueOf(HttpStatus.OK.value()))
                        .message("정상 처리 되었습니다.")
                        .data(blogContents)
                        .build()
        );


    }


}
