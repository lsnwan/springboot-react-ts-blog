package com.example.backend.security;

import com.example.backend.entity.Account;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;

@Getter
public class UserAccount extends User {

    private static final long serialVersionUID = -3947057296139195654L;
    private final Account account;

    public UserAccount(Account account, Collection<? extends GrantedAuthority> authorities) {
        super(account.getEmail(), account.getPassword(), authorities);
        this.account = account;
    }
}
