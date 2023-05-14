package com.example.backend.service.subscribe;

import com.example.backend.entity.Account;
import com.example.backend.entity.Subscribe;
import com.example.backend.repository.SubscribeRepository;
import com.example.backend.service.subscribe.dto.MySubscribeDto;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.example.backend.entity.QBlogInfo.blogInfo;
import static com.example.backend.entity.QSubscribe.subscribe;
import static com.example.backend.entity.QAccount.account;
@Service
@RequiredArgsConstructor
public class SubscribeService {

    private final SubscribeRepository subscribeRepository;
    private final JPAQueryFactory queryFactory;

    public List<MySubscribeDto> findMySubscribes(Account fromAccount) {

        return queryFactory.select(
                Projections.fields(
                    MySubscribeDto.class,
                    subscribe.toAccount.nickname.as("nickname"),
                    subscribe.toAccount.profilePath.as("profilePath"),
                    Expressions.as(
                        JPAExpressions.select(
                                blogInfo.blogPath
                            ).from(blogInfo)
                            .where(blogInfo.account.id.eq(subscribe.toAccount.id))
                        , "blogPath"
                    )
                )
            ).from(subscribe)
            .join(account).on(account.id.eq(subscribe.fromAccount.id))
            .where(
                    subscribe.fromAccount.eq(fromAccount)
                    .and(subscribe.toAccount.enabled.eq(true))
            ).fetch();

    }
}
