package com.example.backend.api.test;

import com.example.backend.cmm.dto.ResponseDataDto;
import com.example.backend.feign.HelloClient;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/feign")
@RequiredArgsConstructor
public class FeignClientController {

    private final HelloClient helloClient;


    @GetMapping("/test")
    public ResponseDataDto<Object> feignTest() {
        ResponseDataDto<Object> responseDataDto = helloClient.testGet();
        return responseDataDto;
    }

}
