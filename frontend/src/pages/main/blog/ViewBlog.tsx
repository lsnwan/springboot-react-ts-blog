import React, {useEffect, useRef, useState} from 'react';
import {useSearchParams} from "react-router-dom";
import {Container, ContentBody, UserProfile} from "../../../components/styled/content-styled";
import {
  BadgeBox,
  BlogContentCard,
  BlogContentCardBody,
  BlogContentCardPanel,
  BlogContentCardSubject,
  BlogContentRegDate, BlogContentStyle,
  BlogContentThumbnail,
  BlogContentUserNickname,
  BlogContentUserProfile,
  BlogContentWriter,
  BlogContentWriterBody,
  ContentSubject
} from "../../../components/styled/myblog-styled";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as icon from "@fortawesome/free-solid-svg-icons";
import * as SC from "../../../components/styled/common-styled";
import {ButtonLight, RelativeDiv} from "../../../components/styled/common-styled";
import {useSelector} from "react-redux";
import {AppState} from "../../../store";
import * as T from "../../../store/theme";
import * as SH from "../../../components/styled/header-styled";
import axios from "axios";
import {useParams} from "react-router";
import {Path} from "@remix-run/router/history";
import * as U from "../../../utils";
import Loading from "../../../components/cmm/Loading";

const tags = ['react','typescript','springboot','springcloud',];

type BlogTagType = {
  tagIdx: number;
  tagName: string;
}

type BlogContentViewType = {
  accountId: string;
  accountNickname: string;
  accountProfileUrl: string;
  blogContent: string;
  blogContentIdx: number;
  blogEnabled: boolean;
  blogPathName: string;
  blogSubject: string;
  blogThumbnailUrl: string;
  contentEnabled: boolean;
  modifiedDate: string;
  registeredDate: string;
  blogOwner: boolean;
  blogTags: Array<BlogTagType>;
}

const ViewBlog = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const theme = useSelector<AppState, T.State>(state => state.themeType);
  const dropboxRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const {blogPath} = useParams<string>();
  const [blogContent, setBlogContent] = useState<BlogContentViewType>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleMenuOpen = () => {
    setMenuOpen((prevValue) => !prevValue);
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropboxRef.current && !dropboxRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropboxRef]);

  useEffect(() => {
    loadBlogContent();
  }, []);

  const loadBlogContent = async () => {
    await axios.get(`/api/blogs/${blogPath}/view?id=${searchParams.get("id")}`)
      .then(res => res.data)
      .then((result: {code: string; message: string; data?:any; path: string | Partial<Path>;}) => {
        console.log(result);
        setBlogContent(result.data);
        setIsLoading(false);
      });
  }

  return (
    <ContentBody>
      {isLoading && (
        <Loading />
      )}
      <Container>
        <div className="d-flex">
          <div style={{width: "865px", paddingRight: "10px"}}>
            <div className="mb-3">
              <BadgeBox className="mt-2">
                {blogContent?.blogTags.map((tag) => (
                  <span key={tag.tagIdx} className="badge bg-secondary">{tag.tagName}</span>
                ))}
              </BadgeBox>
            </div>

            <ContentSubject>{blogContent?.blogSubject}</ContentSubject>

            <div className="d-flex justify-content-between align-items-center mt-3">
              <div className="d-flex justify-content-start align-items-center">
                <UserProfile className="large" imagePath='/images/no-profile.png' />
                <div className="ms-2">
                  <h6 className="fw-semibold mb-0">{blogContent?.accountNickname}</h6>
                  {/*<small>{blogContent.registeredDate}</small>*/}
                  <small>
                    {blogContent?.registeredDate && (
                      <>
                        {U.formatDate(blogContent.registeredDate)}
                      </>
                    )}</small>
                </div>
              </div>
              <RelativeDiv ref={dropboxRef} onClick={handleMenuOpen}>
                <ButtonLight theme={theme}>
                  <FontAwesomeIcon icon={icon.faEllipsisV} />
                </ButtonLight>
                <SH.ProfileDropBoxBody theme={theme} className={menuOpen ? "active" : ""}>
                  <SH.ProfileDropBoxList theme={theme}>즐겨찾기</SH.ProfileDropBoxList>
                  <SC.Divider></SC.Divider>
                  {blogContent?.blogOwner && (
                    <>
                      <SH.ProfileDropBoxList theme={theme}>수정</SH.ProfileDropBoxList>
                      <SH.ProfileDropBoxList theme={theme}>삭제</SH.ProfileDropBoxList>
                    </>
                  )}
                  {!blogContent?.blogOwner && (
                    <>
                      <SH.ProfileDropBoxList theme={theme}>구독하기</SH.ProfileDropBoxList>
                    </>
                  )}
                </SH.ProfileDropBoxBody>
              </RelativeDiv>
            </div>

            {blogContent?.blogContent && (
              <BlogContentStyle className="mt-5" dangerouslySetInnerHTML={{ __html: blogContent.blogContent }} />
            )}

          </div>

          <BlogContentCardPanel>
            {[1,2,3,4,5,6,7,8,9,10].map((item) => (
              <BlogContentCard key={item}>
                <BlogContentThumbnail  />
                <BlogContentCardBody>
                  <BlogContentWriterBody>
                    <BlogContentWriter>
                      <BlogContentUserProfile />
                      <BlogContentUserNickname>
                        닉네임입니다
                      </BlogContentUserNickname>
                    </BlogContentWriter>
                    <BlogContentRegDate>
                      방금전
                    </BlogContentRegDate>
                  </BlogContentWriterBody>
                  <BlogContentCardSubject>
                    동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라만세 무궁화 삼천리 화려강산
                  </BlogContentCardSubject>
                </BlogContentCardBody>
              </BlogContentCard>
            ))}
          </BlogContentCardPanel>
        </div>


      </Container>
    </ContentBody>
  );
};

export default ViewBlog;