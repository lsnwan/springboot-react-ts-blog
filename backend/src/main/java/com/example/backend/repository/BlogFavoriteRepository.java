package com.example.backend.repository;

import com.example.backend.entity.Account;
import com.example.backend.entity.BlogContent;
import com.example.backend.entity.BlogFavorite;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BlogFavoriteRepository extends JpaRepository<BlogFavorite, Long> {

    boolean existsByAccountAndBlogContent(Account account, BlogContent blogContent);
    BlogFavorite findByAccountAndBlogContent(Account account, BlogContent blogContent);

}
