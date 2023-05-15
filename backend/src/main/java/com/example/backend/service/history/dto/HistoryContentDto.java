package com.example.backend.service.history.dto;

import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
public class HistoryContentDto implements Serializable {

    private static final long serialVersionUID = 7020330500959443393L;

    private Long contentIdx;
    private String blogCategory;
    private String contentTitle;
    private String blogPathName;
    private String contentThumbnail;
    private boolean contentEnabled;
    private String accountProfile;
    private String accountNickname;

    private LocalDateTime contentRegisteredDate;
}
