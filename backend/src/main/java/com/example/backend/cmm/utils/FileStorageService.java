package com.example.backend.cmm.utils;

import com.example.backend.cmm.error.exception.NotCreateDirectoryException;
import com.example.backend.cmm.error.exception.NotStoreFileException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

public class FileStorageService {

    private final Path fileStorageLocation;

    public FileStorageService(String uploadDir) {
        this.fileStorageLocation = Paths.get(uploadDir)
                .toAbsolutePath().normalize();

        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new NotCreateDirectoryException("디렉토리를 생성할 수 없습니다.");
        }
    }

    public String storeFile(MultipartFile file) {
//        String fileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));

        String contentType = file.getContentType();
        if (contentType == null) {
            return null;
        }

        String ext = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf(".") + 1);
        String fileName = UUID.randomUUID().toString().replaceAll("-", "") + "." + ext;
        try {
            Path targetLocation = this.fileStorageLocation.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation);
            return fileName;
        } catch (IOException ex) {
            throw new NotStoreFileException(fileName + "를(을) 저장할 수 없습니다. 다시 시도 하세요");
        }
    }

}
