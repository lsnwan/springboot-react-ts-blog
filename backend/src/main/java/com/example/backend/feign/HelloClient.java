package com.example.backend.feign;

import com.example.backend.cmm.dto.ResponseDataDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

@FeignClient(url = "http://localhost:8080", name = "helloClient")
public interface HelloClient {

    @GetMapping(value = "/test/get", consumes = "application/json")
    ResponseDataDto<Object> testGet();

}
