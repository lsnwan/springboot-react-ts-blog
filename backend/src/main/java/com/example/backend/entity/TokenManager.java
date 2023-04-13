package com.example.backend.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name = "token_manager")
@Getter @Setter @EqualsAndHashCode(of = "idx")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TokenManager {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tm_idx")
    private Long idx;

    @Column(name = "platform_type")
    private String platformType;

    @Column(name = "acc_id")
    private String accountId;

    @Column(name = "tm_refsh_tokn", length = 4000)
    private String refreshToken;

    @Column(name = "client_ip")
    private String clientIp;

    @Column(name = "tm_tokn_expire")
    private Date expireTime;

}
