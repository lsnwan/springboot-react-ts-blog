package com.example.backend.entity;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "account")
@Getter @Setter @EqualsAndHashCode(of = "idx")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Account {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "acc_idx")
    private Long idx;

    @Column(name = "acc_type")
    private String accountType;

    @Column(name = "acc_id", unique = true)
    private String id;

    @Column(name = "acc_nnm")
    private String nickname;

    @Column(name = "acc_pw")
    private String password;

    @Column(name = "enabled")
    private boolean enabled;

    @OneToMany(mappedBy = "account")
    private List<AccountAuthority> authorities;

}
