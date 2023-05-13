package com.example.backend.repository;

import com.example.backend.entity.BlogContent;
import com.example.backend.entity.BlogTag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BlogTagRepository extends JpaRepository<BlogTag, Long> {

    List<BlogTag> findByBlogContent(BlogContent blogContent);
    void deleteByBlogContent(BlogContent blogContent);
}
