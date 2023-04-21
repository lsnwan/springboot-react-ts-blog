package com.example.backend.service.blog;

import com.example.backend.entity.BlogInfo;
import com.example.backend.repository.BlogInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BlogInfoService {

    private final BlogInfoRepository blogInfoRepository;


    public BlogInfo createBlogInfo(final BlogInfo blogInfo) {
        return blogInfoRepository.save(blogInfo);

    }

}
