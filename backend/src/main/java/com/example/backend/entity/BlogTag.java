package com.example.backend.entity;

import com.example.backend.entity.base.RegisteredDateEntity;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "blog_tag")
@Getter @Setter @EqualsAndHashCode(of = "idx", callSuper = true)
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BlogTag extends RegisteredDateEntity implements Serializable {

    private static final long serialVersionUID = -7504215099638252733L;

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bt_idx")
    private Long idx;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bc_idx", referencedColumnName = "bc_idx")
    private BlogContent blogContent;

    @Column(name = "bt_nm")
    private String tagName;


}
