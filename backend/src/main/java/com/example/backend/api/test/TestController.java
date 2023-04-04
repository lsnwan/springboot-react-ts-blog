package com.example.backend.api.test;

import com.example.backend.cmm.domain.ResponseDto;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/")
    public ResponseDto test() {
        return ResponseDto.builder()
                .message("HelloWorld")
                .build();
    }

    @PostMapping("/")
    public String testPost() {
        return "hello world!!! POST!!!";
    }

}
