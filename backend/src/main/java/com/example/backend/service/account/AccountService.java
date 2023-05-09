package com.example.backend.service.account;

import com.example.backend.entity.Account;
import com.example.backend.repository.AccountRepository;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.example.backend.entity.QAccount.account;
import static com.example.backend.entity.QAccountAuthority.accountAuthority;

@Service
@Slf4j
@RequiredArgsConstructor
public class AccountService {

    private final AccountRepository accountRepository;
    private final JPAQueryFactory queryFactory;

    public Account getAccount(String accountId) {
        List<Account> accounts = queryFactory
                .select(
                        account
                ).from(account)
                .leftJoin(accountAuthority).on(account.id.eq(accountAuthority.account.id)).fetchJoin()
                .where(account.id.eq(accountId))
                .distinct()
                .fetch();

        if (accounts.isEmpty()) {
            return null;
        }

        return accounts.get(0);
    }

}
