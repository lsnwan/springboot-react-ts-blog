package com.example.backend.init;

import com.example.backend.cmm.utils.GeneratorUtils;
import com.example.backend.entity.*;
import com.example.backend.entity.type.AccountType;
import com.example.backend.entity.type.BlogCategoryType;
import com.example.backend.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Profile("default")
@Component
@Slf4j
@RequiredArgsConstructor
public class ApplicationStartRunner implements ApplicationRunner {

    private final AuthorityRepository authorityRepository;
    private final AccountRepository accountRepository;
    private final AccountAuthorityRepository accountAuthorityRepository;
    private final PasswordEncoder passwordEncoder;
    private final BlogInfoRepository blogInfoRepository;
    private final BlogContentRepository blogContentRepository;
    private final BlogTagRepository blogTagRepository;

    private final String ADMIN_EMAIL = "admin@admin.admin";

    @Override
    public void run(ApplicationArguments args) throws Exception {
        log.info("==== Initialize ==================================================");

        Account account = Account.builder()
                .AccountType(AccountType.WEB)
                .email(ADMIN_EMAIL)
                .id(GeneratorUtils.uniqueId())
                .password(passwordEncoder.encode("1234"))
                .nickname("관리자")
                .emailVerifiedCode(GeneratorUtils.token(6))
                .emailVerifiedDate(LocalDateTime.now())
                .emailVerifiedConfirmDate(LocalDateTime.now().plusSeconds(10))
                .enabled(true)
                .build();

        accountRepository.save(account);

        Authority adminRole = Authority.builder()
                .authCode("ROLE_ADMIN")
                .authName("관리자")
                .authSort(1)
                .build();
        authorityRepository.save(adminRole);

        Authority userRole = Authority.builder()
                .authCode("ROLE_USER")
                .authName("유저")
                .authSort(2)
                .build();

        authorityRepository.save(userRole);

        accountAuthorityRepository.save(AccountAuthority.builder()
                .account(account)
                .authority(userRole)
                .build());

        accountAuthorityRepository.save(AccountAuthority.builder()
                .account(account)
                .authority(adminRole)
                .build());

        List<Authority> authorities = authorityRepository.findAllByOrderByAuthSort();
        for (Authority auth : authorities) {
            log.info(auth.toString());
        }

        Optional<Account> optionalAccount = accountRepository.findOneWithAuthoritiesByEmail(ADMIN_EMAIL);
        if (optionalAccount.isPresent()) {
            log.info(optionalAccount.get().toString());
        } else {
            log.info("계정을 찾을 수 없음");
        }

        BlogInfo saveBlogInfo = blogInfoRepository.save(BlogInfo.builder()
                .idx(1L)
                .account(account)
                .blogPath("test")
                .title(null)
                .introduction(null)
                .imagePath(null)
                .enabled(true)
                .build());

        List<BlogContent> blogContents = new ArrayList<>();
        List<BlogCategoryType> categories = new ArrayList<>();
        categories.add(BlogCategoryType.LIFE);
        categories.add(BlogCategoryType.HOBBY);
        categories.add(BlogCategoryType.SHOPPING);
        categories.add(BlogCategoryType.IT);

        Random random = new Random();
        for (int i = 0; i < 300; i++) {

            BlogContent buildBlogContent = BlogContent.builder()
                    .category(categories.get(random.nextInt(4)))
                    .title("테스트 블로그 타이틀!![" + i + "]")
                    .content("<p>[" + i + "]테스트 블로그 콘텐츠!!!!!!!</p>")
                    .blogInfo(saveBlogInfo)
                    .enabled(true)
                    .build();
            blogContents.add(buildBlogContent);
        }

        blogContentRepository.saveAll(blogContents);

        blogTagRepository.save(BlogTag.builder()
                .blogContent(blogContents.get(299))
                .tagName("리액트")
                .build());

        blogTagRepository.save(BlogTag.builder()
                .blogContent(blogContents.get(299))
                .tagName("타입스크립트")
                .build());


        blogTagRepository.save(BlogTag.builder()
                .blogContent(blogContents.get(298))
                .tagName("리액트")
                .build());

        blogTagRepository.save(BlogTag.builder()
                .blogContent(blogContents.get(298))
                .tagName("스프링부트")
                .build());

    }
}
