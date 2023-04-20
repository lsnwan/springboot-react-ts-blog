package com.example.backend.repository;

import com.example.backend.entity.FindAccount;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FindAccountRepository extends JpaRepository<FindAccount, Long> {

    FindAccount findFirstByEmailOrderByRegisteredDateDesc(String email);
}
