package com.example.backend.entity;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter @Setter @EqualsAndHashCode(of = "idx")

public class AccountRole {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "acc_role_idx")
    private Long idx;

}
