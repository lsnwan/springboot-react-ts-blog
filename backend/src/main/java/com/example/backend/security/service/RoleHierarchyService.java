package com.example.backend.security.service;

import com.example.backend.entity.Authority;
import com.example.backend.repository.AuthorityRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class RoleHierarchyService {

    private final AuthorityRepository authorityRepository;

    public String findAllHierarchy() {

        StringBuilder sbHierarchy = new StringBuilder();
        List<Authority> authorities = authorityRepository.findAllByOrderByAuthSort();

        if (!authorities.isEmpty() && authorities.size() > 1) {
            for (int i = 0; i < authorities.size()-1; i++) {
                Authority firstAuth = authorities.get(i);
                Authority secondAuth = authorities.get(i+1);

                sbHierarchy.append("ROLE_").append(firstAuth.getAuthCode());
                sbHierarchy.append(" > ");
                sbHierarchy.append("ROLE_").append(secondAuth.getAuthCode());

            }
        }

        log.debug("------------------------------------------------");
        log.debug(sbHierarchy.toString());
        log.debug("------------------------------------------------");

        return sbHierarchy.toString();

    }

}
