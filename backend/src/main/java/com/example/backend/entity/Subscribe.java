package com.example.backend.entity;

import com.example.backend.entity.base.RegisteredDateEntity;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "subscribe")
@Getter @Setter @EqualsAndHashCode(of = "idx", callSuper = false)
@AllArgsConstructor
@NoArgsConstructor
public class Subscribe extends RegisteredDateEntity implements Serializable {

    private static final long serialVersionUID = 6592372180252523789L;

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "subs_idx")
    private Long idx;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "from_acc_id", referencedColumnName = "acc_id")
    private Account fromAccount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "to_acc_id", referencedColumnName = "acc_id")
    private Account toAccount;


}
