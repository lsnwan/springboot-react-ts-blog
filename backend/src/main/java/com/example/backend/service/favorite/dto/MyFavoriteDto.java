package com.example.backend.service.favorite.dto;

import com.example.backend.entity.type.BlogCategoryType;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
public class MyFavoriteDto implements Serializable {
    private static final long serialVersionUID = 3664880117880925378L;

    private Long contentIdx;
    private String blogPathName;
    private String contentThumbnail;
    private BlogCategoryType contentCategory;
    private String contentTitle;
    private LocalDateTime registeredDate;
    private LocalDateTime modifiedDate;
    private String contentAccountNickname;
    private String contentAccountProfile;

}

