package com.example.backend.repository;

import com.example.backend.entity.Account;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Long> {

    @EntityGraph(attributePaths = {"authorities"})
    Optional<Account> findOneWithAuthoritiesByEmail(String email);
    @EntityGraph(attributePaths = {"authorities"})
    Optional<Account> findOneWithAuthoritiesById(String id);

    boolean existsByEmail(String email);
}
