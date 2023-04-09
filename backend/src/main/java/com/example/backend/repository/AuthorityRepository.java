package com.example.backend.repository;

import com.example.backend.entity.Authority;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AuthorityRepository extends JpaRepository<Authority, Long> {

    List<Authority> findAllByOrderByAuthSort();
}
