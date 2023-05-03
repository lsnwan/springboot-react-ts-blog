package com.example.backend.service.blog.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class BlogContentRegisteredDto implements Serializable {
    private static final long serialVersionUID = 6525161947678353150L;

    private String registeredDate;
    private long blogCnt;
}
