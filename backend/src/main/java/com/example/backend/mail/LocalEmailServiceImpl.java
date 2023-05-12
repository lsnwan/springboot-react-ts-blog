package com.example.backend.mail;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Profile("default")
@Component
@Slf4j
public class LocalEmailServiceImpl implements EmailService {

    @Override
    public void sendEmail(EmailDto emailDto) {
        log.info("sent email: {}", emailDto.getMessage().substring(
                emailDto.getMessage().indexOf("htt"),
                emailDto.getMessage().lastIndexOf("\" style")).replaceAll("&amp;", "&"));
    }
}
