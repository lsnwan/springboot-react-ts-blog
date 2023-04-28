package com.example.backend.service.blog;

import com.example.backend.entity.BlogInfo;
import com.example.backend.repository.BlogInfoRepository;
import com.example.backend.service.blog.dto.BlogInfoDto;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.EntityPath;
import com.querydsl.core.types.ExpressionUtils;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import java.util.List;

import static com.example.backend.entity.QAccount.account;
import static com.example.backend.entity.QBlogContent.blogContent;
import static com.example.backend.entity.QBlogInfo.blogInfo;
import static com.example.backend.entity.QSubscribe.subscribe;

@Service
@RequiredArgsConstructor
public class BlogInfoService {

    private final BlogInfoRepository blogInfoRepository;
    private final JPAQueryFactory queryFactory;

    public BlogInfo createBlogInfo(final BlogInfo blogInfo) {
        return blogInfoRepository.save(blogInfo);
    }

    public BlogInfoDto getBlogInfo(String blogId) {
        return queryFactory
                .select(
                        Projections.fields(
                                BlogInfoDto.class,
                                blogInfo.idx.as("blogInfoIdx"),
                                blogInfo.registeredDate,
                                blogInfo.blogPath,
                                blogInfo.enabled,
                                blogInfo.imagePath.as("blogBannerImagePath"),
                                blogInfo.introduction.as("blogIntro"),
                                blogInfo.title.as("blogTitle"),
                                account.id.as("accountId"),
                                account.nickname.as("accountName"),
                                account.profilePath.as("accountProfilePath"),
                                Expressions.as(
                                        JPAExpressions.select(subscribe.count())
                                                .from(subscribe)
                                                .where(subscribe.toAccount.id.eq(account.id))
                                        , "totalSubscribeCount"
                                ),
                                Expressions.as(
                                        JPAExpressions.select(blogContent.count())
                                                .from(blogContent)
                                                .where(blogContent.blogInfo.blogPath.eq(blogInfo.blogPath))
                                        ,"totalContentCount"
                                )
                        )
                ).from(blogInfo)
                .leftJoin(account)
                .on(blogInfo.account.id.eq(account.id))
                .where(blogInfo.blogPath.eq(blogId))
                .fetchOne();
    }

}
