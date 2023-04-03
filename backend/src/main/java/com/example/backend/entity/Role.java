package com.example.backend.entity;

import javax.persistence.*;

@Entity
public class Role {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "role_idx")
    private Long idx;

}
