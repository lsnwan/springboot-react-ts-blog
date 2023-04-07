package com.example.backend.cmm.utils;

import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.LocaleResolver;

import java.util.Locale;

@Component
@RequiredArgsConstructor
public class MessageUtils {

    private final MessageSource messageSource;
    private final LocaleResolver localeResolver;

    public String getMessage(String key) {
        return messageSource.getMessage(key,null, localeResolver.resolveLocale(ContextUtil.getRequest()));
    }

    public String getMessage(String key, Object[] objects) {
        return messageSource.getMessage(key,objects,localeResolver.resolveLocale(ContextUtil.getRequest()));
    }

    public String getMessage(String key, Object[] objects, Locale locale) {
        return messageSource.getMessage(key,objects,locale);
    }

}
