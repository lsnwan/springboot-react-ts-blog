package com.example.backend.api.test;

import com.example.backend.cmm.domain.ResponseDto;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
public class TestController {

    @GetMapping("/get")
    public ResponseDto<Object> test() {
        return ResponseDto.builder()
                .code("T001")
                .message("HelloWorld")
                .data("HelloWorld")
                .build();
    }

    @PostMapping("/post")
    public String testPost() {
        return "hello world!!! POST!!!";
    }

}
