package com.example.backend.repository;

import com.example.backend.entity.BlogContent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BlogContentRepository extends JpaRepository<BlogContent, Long> {
}
