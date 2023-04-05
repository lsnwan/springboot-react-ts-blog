package com.example.backend.entity;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "account_authority")
@Getter @Setter @EqualsAndHashCode(of = "idx")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AccountAuthority implements Serializable {

    private static final long serialVersionUID = 9114081288341605343L;

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "acc_auth_idx")
    private Long idx;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "acc_id", referencedColumnName = "acc_id")
    private Account account;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "auth_code", referencedColumnName = "auth_code")
    private Authority authority;

}
