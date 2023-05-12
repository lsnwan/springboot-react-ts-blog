package com.example.backend.api.blog.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Data
public class DeleteBlogContentModel {

    @NotBlank(message = "필수 입력 입니다.")
    private String blogPath;

    @NotBlank(message = "필수 입력 입니다.")
    @Pattern(regexp = "[1-9][0-9]*", message = "0부터 시작할 수 없습니다.")
    private String blogContentIdx;

}
