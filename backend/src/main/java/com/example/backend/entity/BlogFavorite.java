package com.example.backend.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "blog_favorite")
@Getter @Setter @EqualsAndHashCode(of = "idx")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BlogFavorite {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "fav_idx")
    private Long idx;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "acc_id", referencedColumnName = "acc_id")
    private Account account;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bc_idx", referencedColumnName = "bc_idx")
    private BlogContent blogContent;

}
