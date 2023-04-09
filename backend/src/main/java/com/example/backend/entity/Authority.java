package com.example.backend.entity;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "authority")
@Getter @Setter @EqualsAndHashCode(of = "idx")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = {"authorities"})
public class Authority implements Serializable {

    private static final long serialVersionUID = 8541944454048928706L;

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "auth_idx")
    private Long idx;

    @Column(name = "auth_name")
    private String authName;

    @Column(name = "auth_code", unique = true)
    private String authCode;

    @Column(name = "auth_sort")
    private Integer authSort;

    @OneToMany(mappedBy = "authority")
    private List<AccountAuthority> authorities;

}
