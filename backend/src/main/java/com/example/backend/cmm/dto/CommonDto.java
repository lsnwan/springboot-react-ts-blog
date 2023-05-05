package com.example.backend.cmm.dto;

import lombok.Data;

import java.io.Serializable;

public class CommonDto implements Serializable {
    private static final long serialVersionUID = -4635017890700112975L;

    @Data
    public static class Request {
        private Integer pageIndex;
        private Integer pageNum;
        private Integer pageUnit;
        private Integer loadCnt;
    }
}
