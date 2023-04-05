package com.example.backend.entity;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "account")
@Getter @Setter @EqualsAndHashCode(of = "idx")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Account implements Serializable {

    private static final long serialVersionUID = -1479982802553286611L;

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "acc_idx")
    private Long idx;

    @Column(name = "acc_type")
    private String accountType;

    @Column(name = "acc_id", unique = true)
    private String id;

    @Column(name = "acc_email", unique = true)
    private String email;

    @Column(name = "acc_nnm")
    private String nickname;

    @Column(name = "acc_pw")
    private String password;

    @Column(name = "enabled")
    private boolean enabled;

    @OneToMany(mappedBy = "account")
    private List<AccountAuthority> authorities;

}
