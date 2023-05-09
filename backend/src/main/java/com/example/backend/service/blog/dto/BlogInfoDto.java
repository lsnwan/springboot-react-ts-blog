package com.example.backend.service.blog.dto;

import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
public class BlogInfoDto implements Serializable {

    private static final long serialVersionUID = -2298544613784439095L;

    private Long blogInfoIdx;
    private LocalDateTime registeredDate;
    private String blogPath;
    private boolean enabled;
    private String blogBannerImagePath;
    private String blogIntro;
    private String blogTitle;
    private String accountId;
    private String accountName;
    private String accountProfilePath;
    private Long totalSubscribeCount;
    private Long totalContentCount;

    private boolean blogOwner;
    private boolean subscribed;

}
