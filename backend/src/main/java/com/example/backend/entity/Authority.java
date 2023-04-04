package com.example.backend.entity;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "authority")
@Getter @Setter @EqualsAndHashCode(of = "idx")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Authority {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "auth_idx")
    private Long idx;

    @Column(name = "auth_name")
    private String authName;

    @Column(name = "auth_code", unique = true)
    private String authCode;

    @OneToMany(mappedBy = "authority")
    private List<AccountAuthority> authorities;

}
