package com.example.backend.service.favorite;

import com.example.backend.entity.Account;
import com.example.backend.service.favorite.dto.MyFavoriteDto;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.example.backend.entity.QAccount.account;
import static com.example.backend.entity.QBlogContent.blogContent;
import static com.example.backend.entity.QBlogFavorite.blogFavorite;
import static com.example.backend.entity.QBlogInfo.blogInfo;
import static com.example.backend.entity.QSubscribe.subscribe;

@Service
@RequiredArgsConstructor
@Slf4j
public class FavoriteService {

    private final JPAQueryFactory queryFactory;

    public List<MyFavoriteDto> myFavoriteContents(Account myAccount) {

        return queryFactory.select(
                Projections.fields(
                        MyFavoriteDto.class,
                        blogContent.idx.as("contentIdx"),
                        blogContent.blogInfo.blogPath.as("blogPathName"),
                        blogContent.category.as("contentCategory"),
                        blogContent.thumbnail.as("contentThumbnail"),
                        blogContent.title.as("contentTitle"),
                        blogContent.registeredDate.as("registeredDate"),
                        blogContent.modifiedDate.as("modifiedDate"),
                        Expressions.as(
                                JPAExpressions.select(account.nickname)
                                        .from(blogInfo)
                                        .leftJoin(account).on(account.id.eq(blogInfo.account.id))
                                        .where(blogInfo.blogPath.eq(blogContent.blogInfo.blogPath))
                                , "contentAccountNickname"
                        ),
                        Expressions.as(
                                JPAExpressions.select(account.profilePath)
                                        .from(blogInfo)
                                        .leftJoin(account).on(account.id.eq(blogInfo.account.id))
                                        .where(blogInfo.blogPath.eq(blogContent.blogInfo.blogPath))
                                , "contentAccountProfile"
                        )
                )
        ).from(blogFavorite)
        .leftJoin(blogContent).on(blogFavorite.blogContent.eq(blogContent))
        .where(blogFavorite.account.eq(myAccount))
        .fetch();
    }

}
