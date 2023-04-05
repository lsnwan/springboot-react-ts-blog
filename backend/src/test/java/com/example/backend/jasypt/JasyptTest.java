package com.example.backend.jasypt;

import org.jasypt.encryption.pbe.PooledPBEStringEncryptor;
import org.junit.Test;

public class JasyptTest {

    @Test
    public void test() {
        String password = "";
        PooledPBEStringEncryptor encryptor = new PooledPBEStringEncryptor();
        encryptor.setPoolSize(4);
        encryptor.setPassword(password);

        String content = "asdf";

        String encryptedContent = encryptor.encrypt(content);
        String decryptedContent = encryptor.decrypt(encryptedContent);

        System.out.println("Enc: " + encryptedContent + ", Dec: " + decryptedContent);
    }

}
