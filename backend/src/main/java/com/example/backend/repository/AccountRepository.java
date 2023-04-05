package com.example.backend.repository;

import com.example.backend.entity.Account;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Long> {

    //@Query("select a from Account a left outer join AccountAuthority aa on a.id = aa.account.id where a.email = :email")
    @EntityGraph(attributePaths = "authorities")
//    Optional<Account> findLogin(String email);
    Optional<Account> findOneWithAuthoritiesByEmail(String email);
}
