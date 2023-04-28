package com.example.backend.entity;

import com.example.backend.entity.base.RegisteredDateEntity;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "blog_info")
@Getter @Setter @EqualsAndHashCode(of = "idx", callSuper = false)
@Builder
@AllArgsConstructor
public class BlogInfo extends RegisteredDateEntity implements Serializable {

    public BlogInfo() {
        this.enabled = true;
    }

    private static final long serialVersionUID = -5151621531942998893L;

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "blog_info_idx")
    private Long idx;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "acc_id", referencedColumnName = "acc_id")
    private Account account;

    @Column(name = "blog_path_name", unique = true)
    private String blogPath;

    @Column(name = "blog_title")
    private String title;

    @Column(name = "blog_intro", length = 2000)
    private String introduction;

    @Column(name = "blog_image_path")
    private String imagePath;

    @Column(name = "enabled")
    private boolean enabled;
}
