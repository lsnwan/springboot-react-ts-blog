package com.example.backend.repository;

import com.example.backend.entity.BlogContent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface BlogContentRepository extends JpaRepository<BlogContent, Long> {

    Optional<BlogContent> findByIdx(Long idx);
}
