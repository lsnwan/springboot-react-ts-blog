package com.example.backend.entity;

import com.example.backend.entity.base.RegisteredDateEntity;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "account")
@Getter @Setter @EqualsAndHashCode(of = "idx", callSuper = false)
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = {"authorities"})
public class Account extends RegisteredDateEntity implements Serializable {

    private static final long serialVersionUID = -1479982802553286611L;

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "acc_idx")
    private Long idx;

    @Column(name = "acc_id", unique = true)
    private String id;

    @Column(name = "acc_email", unique = true)
    private String email;

    @Column(name = "acc_nnm")
    private String nickname;

    @Column(name = "acc_pw")
    private String password;

    @Column(name = "enabled")
    @ColumnDefault("0")
    private boolean enabled;

    @Column(name = "mail_verified_send_date")
    private LocalDateTime emailVerifiedDate;

    @Column(name = "mail_verified_code")
    private String emailVerifiedCode;

    @Column(name = "mail_verified_confirm_date")
    private LocalDateTime emailVerifiedConfirmDate;

    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL)
    private List<AccountAuthority> authorities;

}
