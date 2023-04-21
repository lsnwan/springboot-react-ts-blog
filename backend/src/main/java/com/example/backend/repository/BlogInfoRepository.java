package com.example.backend.repository;

import com.example.backend.entity.Account;
import com.example.backend.entity.BlogInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface BlogInfoRepository extends JpaRepository<BlogInfo, Long> {

    Optional<BlogInfo> findByAccount(Account account);

    boolean existsByBlogPath(String blogPath);
}
