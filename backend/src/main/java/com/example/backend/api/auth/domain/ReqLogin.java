package com.example.backend.api.auth.domain;

import lombok.Data;

import java.io.Serializable;

@Data
public class ReqLogin implements Serializable {
    private static final long serialVersionUID = -2419889697178917969L;

    private String username;
    private String password;
}
