package com.example.backend.config;

import com.example.backend.cmm.utils.AES256;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class UtilsConfig {

    @Value("${aes256.key}")
    private String key;


    @Bean
    public AES256 aes256() {
        return new AES256(key);
    }

}
