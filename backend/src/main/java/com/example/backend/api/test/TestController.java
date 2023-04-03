package com.example.backend.api.test;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/")
    public String test() {
        return "hello world!!!";
    }

    @PostMapping("/")
    public String testPost() {
        return "hello world!!! POST!!!";
    }

}
