package com.example.backend.repository;

import com.example.backend.entity.BlogContent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BlogContentRepository extends JpaRepository<BlogContent, Long> {

    @Query("select bc from BlogContent bc left outer join BlogInfo bi on bc.blogInfo = bi " +
            "left outer join BlogTag bt on bt.blogContent = bc " +
            "where bi.blogPath = :blogPath and bc.idx = :blogContentIdx")
    List<Object[]> getBlogContentWithAll(String blogPath, Long blogContentIdx);

}
