package com.example.backend.repository;


import com.example.backend.entity.AccountAuthority;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountAuthorityRepository extends JpaRepository<AccountAuthority, Long> {
}
