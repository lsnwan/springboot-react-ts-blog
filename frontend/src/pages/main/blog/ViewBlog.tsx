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
import {useNavigate, useParams} from "react-router";
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
  const navigate = useNavigate();

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

    if (searchParams.get("id") == null) {
      navigate(-1);
    }

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

  /*
   * 즐겨찾기 등록 핸들러
   */
  const handleRegisteredFavorite = () => {
    if (blogContent == null) {
      alert('게시글 정보를 읽을 수 없습니다.');
      navigate(-1);
      return;
    }
    axios.post(`/api/blogs/${blogPath}/favorite`, {
      blogContentIdx: blogContent.blogContentIdx
    })
      .then(res => res.data)
      .then((result: { code: string; message: string; data?: any; path: string | Partial<Path>; }) => {
        console.log(result);
        if (result.code === 'A-001') {
          alert(result.message);
          navigate(result.path);
          return;
        }

        alert(result.message);

      });
  }

  return (
    <ContentBody>
      {isLoading && (
        <Loading />
      )}
      <Container>
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
              <SH.ProfileDropBoxList theme={theme} onClick={handleRegisteredFavorite}>즐겨찾기</SH.ProfileDropBoxList>
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

      </Container>
    </ContentBody>
  );
};

export default ViewBlog;