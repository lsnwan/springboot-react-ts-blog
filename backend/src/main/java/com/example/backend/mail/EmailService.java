package com.example.backend.mail;

import com.example.backend.cmm.error.exception.EncodingException;
import com.example.backend.cmm.error.exception.SendMailException;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.env.Environment;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;

@Data
@Slf4j
@Service
@RequiredArgsConstructor
public class EmailService {

    private final Environment environment;

    private final JavaMailSender javaMailSender;

    @Async
    public void sendEmail(EmailDto emailMessage) {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, false, "UTF-8");
            mimeMessageHelper.setFrom(new InternetAddress(environment.getProperty("spring.mail.username"), "YouBlog"));
            mimeMessageHelper.setTo(emailMessage.getTo());
            mimeMessageHelper.setSubject(emailMessage.getSubject());
            mimeMessageHelper.setText(emailMessage.getMessage(), true);
            javaMailSender.send(mimeMessage);
        } catch (MessagingException e) {
            throw new SendMailException("메일 발송 실패");
        } catch (UnsupportedEncodingException e) {
            throw new EncodingException("지원하지 않는 인코딩 입니다.");
        }
    }


}
