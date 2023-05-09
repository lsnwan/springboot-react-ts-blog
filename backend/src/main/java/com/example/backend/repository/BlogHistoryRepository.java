package com.example.backend.repository;

import com.example.backend.entity.BlogHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BlogHistoryRepository extends JpaRepository<BlogHistory, Long> {
}
