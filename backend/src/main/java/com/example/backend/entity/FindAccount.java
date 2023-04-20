package com.example.backend.entity;

import com.example.backend.entity.base.RegisteredDateEntity;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "find_account")
@Getter @Setter @EqualsAndHashCode(of = "idx", callSuper = false)
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FindAccount extends RegisteredDateEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "fa_idx")
    private long idx;

    @Column(name = "fa_email")
    private String email;

    @Column(name = "fa_change_at")
    private boolean isChangePassword;

    @Column(name = "fa_request_ip")
    private String requestIP;


}
