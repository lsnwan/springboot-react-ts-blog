package com.example.backend.service.blog.dto;

import lombok.Builder;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
public class BlogContentViewDto implements Serializable {
    private static final long serialVersionUID = 5149776473412205155L;

    private Long blogContentIdx;
    private String blogPathName;
    private String blogThumbnailUrl;
    private LocalDateTime registeredDate;
    private LocalDateTime modifiedDate;
    private String blogSubject;
    private String blogContent;
    private boolean contentEnabled;
    private boolean blogEnabled;
    private String accountId;
    private String accountNickname;
    private String accountProfileUrl;
    private boolean blogOwner;
    private boolean subscribed;
    private boolean favorite;
    private String blogCategory;
    private List<BlogContentViewTagDto> blogTags = new ArrayList<>();
}
