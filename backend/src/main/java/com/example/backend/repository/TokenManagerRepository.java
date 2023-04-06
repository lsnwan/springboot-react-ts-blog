package com.example.backend.repository;

import com.example.backend.entity.TokenManager;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TokenManagerRepository extends JpaRepository<TokenManager, Long> {
}
