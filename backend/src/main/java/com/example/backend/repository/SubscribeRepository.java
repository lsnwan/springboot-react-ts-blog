package com.example.backend.repository;

import com.example.backend.entity.Account;
import com.example.backend.entity.Subscribe;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubscribeRepository extends JpaRepository<Subscribe, Long> {

    boolean existsByFromAccountAndToAccount(Account fromAccount, Account toAccount);
    Subscribe findByFromAccountAndToAccount(Account fromAccount, Account toAccount);
}
