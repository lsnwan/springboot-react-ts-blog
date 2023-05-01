package com.example.backend.entity;

import com.example.backend.entity.base.RegisteredDateEntity;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "file_manager")
@Getter @Setter @EqualsAndHashCode(of = "idx", callSuper = false)
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FileManager extends RegisteredDateEntity implements Serializable {

    private static final long serialVersionUID = -2905753909068943365L;

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "file_idx")
    private Long idx;

    @Column(name = "saved_nm")
    private String savedName;

    @Column(name = "origin_name")
    private String originName;

    @Column(name = "file_size")
    private Long size;

    @Column(name = "file_type")
    private String type;

    @Column(name = "registered_id")
    private String registeredId;
}
