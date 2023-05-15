package com.example.backend.service.history.dto;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class HistoriesDto implements Serializable {

    private static final long serialVersionUID = 1864447865957744839L;

    private String historyDate;
    private List<HistoryContentDto> historyContents;

}
