package com.example.backend.cmm.utils;

import java.util.UUID;

public class GeneratorUtils {

    public static String uniqueId() {
        return UUID.randomUUID().toString().replaceAll("-", "");
    }

    public static String token(int size) {
        String uuid = UUID.randomUUID().toString().replaceAll("-", "");
        return uuid.substring(0, size);
    }

}
