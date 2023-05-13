package com.example.backend.api.blog.form;

import lombok.Data;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.List;

public class CreateBlogContentForm implements Serializable {

    private static final long serialVersionUID = -4766670369260338768L;

    @Data
    public static class Request {
        @Size(min = 3, max = 50, message = "3~50자 내외로 입력하세요")
        private String title;

        @NotBlank(message = "컨텐츠를 작성하지 않았습니다.")
        private String content;

        @NotBlank(message = "카테고리를 선택하세요")
        private String category;

        @Valid
        @NotNull(message = "1개 이상의 태그를 등록하세요")
        @Size(min = 1, message = "1개 이상의 태그를 등록하세요")
        private List<String> tags;

        private boolean enabled;
    }
}
