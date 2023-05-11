package com.example.backend.api.settings.form;

import lombok.Builder;
import lombok.Data;

import java.io.Serializable;

public class SettingsForm implements Serializable {
    private static final long serialVersionUID = 2643866995775381660L;

    @Data
    @Builder
    public static class Response {

        private String id;
        private String profilePath;
        private String nickname;

    }

}
