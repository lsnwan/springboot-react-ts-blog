package com.example.backend.service.blog;

import com.example.backend.entity.*;
import com.example.backend.entity.type.BlogCategoryType;
import com.example.backend.repository.BlogHistoryRepository;
import com.example.backend.repository.BlogInfoRepository;
import com.example.backend.service.blog.dto.*;
import com.querydsl.core.types.ConstantImpl;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.example.backend.entity.QAccount.account;
import static com.example.backend.entity.QBlogContent.blogContent;
import static com.example.backend.entity.QBlogHistory.blogHistory;
import static com.example.backend.entity.QBlogInfo.blogInfo;
import static com.example.backend.entity.QBlogTag.blogTag;
import static com.example.backend.entity.QSubscribe.subscribe;

@Service
@RequiredArgsConstructor
@Slf4j
public class BlogService {

    private final BlogInfoRepository blogInfoRepository;
    private final JPAQueryFactory queryFactory;
    private final BlogHistoryRepository blogHistoryRepository;

    public BlogInfo createBlogInfo(final BlogInfo blogInfo) {
        return blogInfoRepository.save(blogInfo);
    }

    public BlogInfoDto getBlogInfo(String blogPath) {
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
                .where(blogInfo.blogPath.eq(blogPath))
                .fetchOne();
    }

    public List<BlogContentDto> getBlogContent(String blogPath, int pageIndex, int pageUnit, Boolean isOwner, String categoryType) {

        BooleanExpression expression = Expressions.asString("1").eq("1");

        if (blogPath != null) {
            expression = blogInfo.blogPath.eq(blogPath);
        }

        if (isOwner != null) {
            if (!isOwner) {
                expression = expression.and(blogContent.enabled.isTrue());
            }
        }

        if (categoryType != null) {
            expression = expression.and(blogContent.category.eq(BlogCategoryType.from(categoryType)));
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

    public List<BlogContentRegisteredDto> getBlogRegisteredCalendar(String blogPath, boolean isOwner) {

        BooleanExpression expression = blogInfo.blogPath.eq(blogPath);
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

    public BlogContent getBlogContentView(String blogPath, Long blogId) {
        BooleanExpression expression = blogInfo.blogPath.eq(blogPath).and(blogContent.idx.eq(blogId));
        List<BlogContent> blogContents = queryFactory.select(
                        blogContent
                )
                .from(blogInfo)
                .leftJoin(account).on(account.id.eq(blogInfo.account.id)).fetchJoin()
                .leftJoin(blogContent).on(blogContent.blogInfo.blogPath.eq(blogInfo.blogPath)).fetchJoin()
                .leftJoin(blogTag).on(blogTag.blogContent.eq(blogContent)).fetchJoin()
                .where(expression)
                .distinct()
                .fetch();

        if (blogContents.isEmpty()) {
            return null;
        }

        return blogContents.get(0);
    }

    public Map<String, Object> getBlogContentView(Account loginAccount, String blogPath, Long blogId, boolean isOwner) {

        BooleanExpression expression = blogInfo.blogPath.eq(blogPath).and(blogContent.idx.eq(blogId));
        if (!isOwner) {
            expression = expression.and(blogContent.enabled.isTrue());
        }

        List<BlogContent> blogContents = queryFactory.select(
                    blogContent
                )
                .from(blogInfo)
                .leftJoin(account).on(account.id.eq(blogInfo.account.id)).fetchJoin()
                .leftJoin(blogContent).on(blogContent.blogInfo.blogPath.eq(blogInfo.blogPath)).fetchJoin()
                .leftJoin(blogTag).on(blogTag.blogContent.eq(blogContent)).fetchJoin()
                .where(expression)
                .distinct()
                .fetch();

        if (blogContents.isEmpty()) {
            return null;
        }

        List<BlogHistory> blogHistories = new ArrayList<>();
        if (loginAccount != null) {
            blogHistories = queryFactory.select(
                            blogHistory
                    ).from(blogHistory)
                    .where(blogHistory.blogContent.eq(blogContents.get(0))
                            .and(blogHistory.account.id.eq(loginAccount.getId()))
                            .and(Expressions.stringTemplate("DATE_FORMAT({0}, {1})", blogHistory.registeredDate, ConstantImpl.create("%Y-%m-%d")).eq(LocalDate.now().toString())))
                    .groupBy(Expressions.stringTemplate(
                            "DATE_FORMAT({0}, {1})",
                            blogHistory.registeredDate,
                            ConstantImpl.create("%Y-%m-%d")
                    ))
                    .fetch();
        }

        /**
         * 이력 저장
         */
        if (blogHistories.isEmpty()) {
            blogHistoryRepository.save(BlogHistory.builder()
                            .account(loginAccount)
                            .blogContent(blogContents.get(0))
                    .build());
        }

        List<BlogContentViewTagDto> blogContentViewTagDtos = new ArrayList<>();
        if (!blogContents.get(0).getBlogTags().isEmpty()) {
            for (BlogTag blogTag : blogContents.get(0).getBlogTags()) {
                BlogContentViewTagDto build = BlogContentViewTagDto.builder()
                        .tagIdx(blogTag.getIdx())
                        .tagName(blogTag.getTagName())
                        .build();
                blogContentViewTagDtos.add(build);
            }
        }

        BlogContentViewDto blogContentViewDto = BlogContentViewDto.builder()
                .blogContentIdx(blogContents.get(0).getIdx())
                .blogPathName(blogContents.get(0).getBlogInfo().getBlogPath())
                .blogThumbnailUrl(blogContents.get(0).getThumbnail())
                .registeredDate(blogContents.get(0).getRegisteredDate())
                .modifiedDate(blogContents.get(0).getModifiedDate())
                .blogSubject(blogContents.get(0).getTitle())
                .blogContent(blogContents.get(0).getContent())
                .contentEnabled(blogContents.get(0).isEnabled())
                .blogEnabled(blogContents.get(0).getBlogInfo().isEnabled())
                .accountId(blogContents.get(0).getBlogInfo().getAccount().getId())
                .accountNickname(blogContents.get(0).getBlogInfo().getAccount().getNickname())
                .accountProfileUrl(blogContents.get(0).getBlogInfo().getAccount().getProfilePath())
                .blogTags(blogContentViewTagDtos)
                .blogCategory(blogContents.get(0).getCategory().toString())
                .build();

        Map<String, Object> result = new HashMap<>();
        result.put("blogContentViewDto", blogContentViewDto);
        result.put("blogContent", blogContents.get(0));
        return result;
    }

}
