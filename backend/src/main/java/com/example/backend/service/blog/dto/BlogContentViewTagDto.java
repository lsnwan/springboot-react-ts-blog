package com.example.backend.service.blog.dto;

import lombok.Builder;
import lombok.Data;

import java.io.Serializable;

@Data
@Builder
public class BlogContentViewTagDto implements Serializable {

    private static final long serialVersionUID = -7794539123905106596L;

    private Long tagIdx;
    private String tagName;
}
