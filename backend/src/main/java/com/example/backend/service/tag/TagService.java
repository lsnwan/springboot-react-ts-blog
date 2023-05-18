package com.example.backend.service.tag;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.example.backend.entity.QBlogTag.blogTag;

@Service
@RequiredArgsConstructor
@Slf4j
public class TagService {

    private final JPAQueryFactory queryFactory;


    public List<String> getTags() {
        return queryFactory.select(
                        blogTag.tagName
                ).from(blogTag)
                .groupBy(blogTag.tagName)
                .orderBy(blogTag.tagName.count().desc())
                .fetch();
    }
}
