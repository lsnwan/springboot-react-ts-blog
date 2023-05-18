package com.example.backend.api.tag;

import com.example.backend.cmm.dto.ResponseDataDto;
import com.example.backend.service.tag.TagService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/tags")
@Slf4j
public class TagController {

    private final TagService tagService;

    @GetMapping("")
    public ResponseEntity<?> getTags() {
        return ResponseEntity.ok().body(
                ResponseDataDto.builder()
                        .code(String.valueOf(HttpStatus.OK.value()))
                        .message("정상 처리 되었습니다.")
                        .data(tagService.getTags())
                        .build()
        );
    }

}
