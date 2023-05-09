package com.example.backend.entity;

import com.example.backend.entity.base.RegisteredDateEntity;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "blog_history")
@Getter @Setter @EqualsAndHashCode(of = "idx", callSuper = false)
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BlogHistory extends RegisteredDateEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "his_idx")
    private Long idx;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "acc_id", referencedColumnName = "acc_id")
    private Account account;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bc_idx", referencedColumnName = "bc_idx")
    private BlogContent blogContent;


}
