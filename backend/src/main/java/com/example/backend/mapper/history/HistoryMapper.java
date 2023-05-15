package com.example.backend.mapper.history;

import com.example.backend.service.history.dto.HistoriesDto;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Mapper
@Repository
public interface HistoryMapper {

    List<HistoriesDto> getMyHistories(Map<String, Object> params);

}
