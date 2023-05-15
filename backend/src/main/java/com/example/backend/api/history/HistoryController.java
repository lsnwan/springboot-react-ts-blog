package com.example.backend.api.history;

import com.example.backend.cmm.dto.CommonDto;
import com.example.backend.cmm.dto.ResponseDataDto;
import com.example.backend.entity.Account;
import com.example.backend.security.CurrentAccount;
import com.example.backend.service.history.HistoryService;
import com.example.backend.service.history.dto.HistoriesDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/history")
@RequiredArgsConstructor
@Slf4j
public class HistoryController {

    private final HistoryService historyService;


    @GetMapping("")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> myHistories(@CurrentAccount Account account, CommonDto.Request commonDto) {

        List<HistoriesDto> myHistories = historyService.getMyHistories(account, commonDto);

        return ResponseEntity.ok().body(
                ResponseDataDto.builder()
                        .code(String.valueOf(HttpStatus.OK.value()))
                        .message("정상 처리 되었습니다.")
                        .data(myHistories)
                        .build());
    }

}
