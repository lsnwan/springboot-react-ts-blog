package com.example.backend.service.blog.dto;

import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
public class BlogContentDto implements Serializable {
    private static final long serialVersionUID = -1268408978858392790L;

    private Long blogContentIdx;
    private String blogPathName;
    private String blogThumbnailUrl;
    private LocalDateTime registeredDate;
    private LocalDateTime modifiedDate;
    private String blogTitle;
    private boolean contentEnabled;
    private boolean blogEnabled;
    private String accountNickname;
    private String accountProfileUrl;

}
