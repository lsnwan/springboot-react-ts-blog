package com.example.backend.entity;

import com.example.backend.entity.base.AllDateEntity;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "blog_content")
@Getter @Setter @EqualsAndHashCode(of = "idx", callSuper = false)
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BlogContent extends AllDateEntity implements Serializable {

    private static final long serialVersionUID = 1394182953006355729L;

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bc_idx")
    private Long idx;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "blog_path_name", referencedColumnName = "blog_path_name")
    private BlogInfo blogInfo;

    @Column(name = "blog_title", length = 50)
    private String title;

    @Column(name = "blog_content")
    @Lob
    private String content;

    @Column(name = "blog_thumbnail")
    private String thumbnail;

    @Column(name = "enabled")
    private boolean enabled;

}
