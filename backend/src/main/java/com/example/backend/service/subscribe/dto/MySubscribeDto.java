package com.example.backend.service.subscribe.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class MySubscribeDto implements Serializable {
    private static final long serialVersionUID = -713516673099473911L;

    private String nickname;
    private String profilePath;
    private String blogPath;

}
