package com.example.backend.repository;

import com.example.backend.entity.Account;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Long> {

    @EntityGraph(attributePaths = {"authorities"})
    Optional<Account> findOneWithAuthoritiesByEmail(String email);
}
