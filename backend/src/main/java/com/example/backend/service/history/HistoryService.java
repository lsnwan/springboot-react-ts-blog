package com.example.backend.service.history;

import com.example.backend.cmm.dto.CommonDto;
import com.example.backend.entity.Account;
import com.example.backend.mapper.history.HistoryMapper;
import com.example.backend.service.history.dto.HistoriesDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.Serializable;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@Slf4j
public class HistoryService implements Serializable {

    private static final long serialVersionUID = 6926444985976171303L;
    private final HistoryMapper historyMapper;

    public List<HistoriesDto> getMyHistories(Account account, CommonDto.Request commonDto) {
        Map<String, Object> params = new HashMap<>();
        params.put("accountId", account.getId());
        params.put("commonDto", commonDto);
        return historyMapper.getMyHistories(params);
    }

}
