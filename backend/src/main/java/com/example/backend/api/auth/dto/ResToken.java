package com.example.backend.api.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResToken implements Serializable {
    private static final long serialVersionUID = 2606476754754365239L;

    private String token;

}
