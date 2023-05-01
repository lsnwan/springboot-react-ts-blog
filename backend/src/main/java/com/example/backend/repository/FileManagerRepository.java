package com.example.backend.repository;

import com.example.backend.entity.FileManager;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FileManagerRepository extends JpaRepository<FileManager, Long> {
}
