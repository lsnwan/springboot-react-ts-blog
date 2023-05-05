package com.example.backend.service.blog;

import com.example.backend.entity.BlogInfo;
import com.example.backend.repository.BlogInfoRepository;
import com.example.backend.service.blog.dto.BlogContentDto;
import com.example.backend.service.blog.dto.BlogContentRegisteredDto;
import com.example.backend.service.blog.dto.BlogInfoDto;
import com.querydsl.core.types.ConstantImpl;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.example.backend.entity.QAccount.account;
import static com.example.backend.entity.QBlogContent.blogContent;
import static com.example.backend.entity.QBlogInfo.blogInfo;
import static com.example.backend.entity.QSubscribe.subscribe;

@Service
@RequiredArgsConstructor
public class BlogService {

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

    public List<BlogContentDto> getBlogContent(String blogId, int pageIndex, int pageUnit, boolean isOwner) {

        BooleanExpression expression = blogInfo.blogPath.eq(blogId);
        if (!isOwner) {
            expression = expression.and(blogContent.enabled.isTrue());
        }

        return queryFactory
                .select(
                        Projections.fields(
                                BlogContentDto.class,
                                blogContent.idx.as("blogContentIdx"),
                                blogContent.blogInfo.blogPath.as("blogPathName"),
                                blogContent.thumbnail.as("blogThumbnailUrl"),
                                blogContent.registeredDate,
                                blogContent.modifiedDate,
                                blogContent.title.as("blogTitle"),
                                blogContent.enabled.as("contentEnabled"),
                                blogInfo.enabled.as("blogEnabled"),
                                account.nickname.as("accountNickname"),
                                account.profilePath.as("accountProfileUrl")
                        )
                )
                .from(blogContent)
                .leftJoin(blogInfo).on(blogContent.blogInfo.blogPath.eq(blogInfo.blogPath))
                .leftJoin(account).on(blogInfo.account.id.eq(account.id))
                .where(expression)
                .orderBy(blogContent.registeredDate.desc())
                .offset(((long) (pageIndex - 1) * pageUnit)).limit(pageUnit)
                .fetch();
    }

    public List<BlogContentRegisteredDto> getBlogRegisteredCalendar(String blogId, boolean isOwner) {

        BooleanExpression expression = blogInfo.blogPath.eq(blogId);
        if (!isOwner) {
            expression = expression.and(blogContent.enabled.isTrue());
        }

        return queryFactory
                .select(
                    Projections.fields(
                        BlogContentRegisteredDto.class,
                        Expressions.stringTemplate(
                            "DATE_FORMAT({0}, {1})",
                            blogContent.registeredDate,
                            ConstantImpl.create("%Y-%m-%d")).as("registeredDate"),
                        blogContent.count().as("blogCnt")
                    )
                ).from(blogContent)
                .leftJoin(blogInfo)
                .on(blogContent.blogInfo.blogPath.eq(blogInfo.blogPath))
                .where(expression)
                .groupBy(Expressions.stringTemplate(
                        "DATE_FORMAT({0}, {1})",
                        blogContent.registeredDate,
                        ConstantImpl.create("%Y-%m-%d")
                ))
                .fetch();
    }

}
