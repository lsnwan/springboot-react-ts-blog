import React, {useEffect, useState} from 'react';
import {BlogAuthorDiv, BlogAvatar, BlogBgDiv, BlogTabMenuDiv, BlogWrite,} from "../components/styled/myblog-styled";
import {Helmet} from "react-helmet";
import {useAuth} from "../contexts";
import {useNavigate, useParams} from "react-router";
import {ButtonDark, ButtonLight, FlexBetween, LinkTeg} from "../components/styled/common-styled";
import {useSelector} from "react-redux";
import {AppState} from "../store";
import * as T from "../store/theme";
import {ContentBody} from "../components/styled/content-styled";
import {Outlet} from "react-router-dom";
import axios from "axios";

type BlogInfoType = {
  accountId: string;
  accountName: string;
  accountProfilePath: string;
  blogBannerImagePath: string;
  blogInfoIdx: number;
  blogIntro: string;
  blogOwner: boolean;
  blogPath: string;
  blogTitle: string;
  enabled: boolean;
  registeredDate: string;
  totalContentCount: number;
  totalSubscribeCount: number

}

const BlogLayout = () => {

  const theme = useSelector<AppState, T.State>(state => state.themeType);
  const [currentUri, setCurrentUri] = useState<string>('');
  const {loggedUser} = useAuth();
  const {blogPath} = useParams<string>();
  const navigate = useNavigate();
  const tabs = [
    {index: 0, title: '홈', path: `/${blogPath}`},
    {index: 1, title: '게시글', path: `/${blogPath}/published`},
    {index: 2, title: '정보', path: `/${blogPath}/inst`},
    {index: 3, title: '설정', path: `/${blogPath}/settings`},
  ];

  const [blogInfo, setBlogInfo] = useState<BlogInfoType>({
    accountId: '',
    accountName: '',
    accountProfilePath: '',
    blogBannerImagePath: '',
    blogInfoIdx: 0,
    blogIntro: '',
    blogOwner: false,
    blogPath: '',
    blogTitle: '',
    enabled: false,
    registeredDate: '',
    totalContentCount: 0,
    totalSubscribeCount: 0
  });

  useEffect(() => {
    setCurrentUri(window.location.pathname);
  });

  useEffect(() => {
    axios.get(`/api/blogs/${blogPath}/info`)
      .then(res => res.data)
      .then((result: {code: string; message: string; data: BlogInfoType;}) => {
        if (result.code !== '200') {
          alert(result.message);
          return;
        }

        setBlogInfo(result.data);
      })
  }, [])

  const handleMyInst = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    navigate(`/${blogPath}/inst`);
  }

  const handleMoveLink = (path: string) => {
    navigate(path);
  }

  return (
    <ContentBody>
      <Helmet>
        <title>{blogPath} - YouBlog</title>
      </Helmet>

      {blogInfo.blogBannerImagePath && (
        <BlogBgDiv imagePath={blogInfo.blogBannerImagePath}/>
      )}

      <BlogAuthorDiv className="mt-3">
        <BlogAvatar profilePath={blogInfo.accountProfilePath}>
          <span className="visually-hidden">사용자 프로필 이미지</span>
        </BlogAvatar>
        <FlexBetween className="block px-2">
          <div>
            <h5 className="fw-semibold mb-0">{blogInfo.accountName}</h5>
            <p className="mb-1">
              <span>
                <small className="fw-semibold">구독자:</small> <small>{blogInfo.totalSubscribeCount}</small> <small className="fw-semibold">발행한 글:</small> <small>{blogInfo.totalContentCount}</small>
              </span>
            </p>
            <p className="mb-0">
              <LinkTeg theme={theme} href='#' onClick={handleMyInst}>
                {blogInfo.blogIntro}
              </LinkTeg>
            </p>
          </div>
          <BlogWrite>
            {blogInfo.blogOwner && (
              <ButtonLight className="small" onClick={() => navigate(`/${blogPath}/create`)}>글쓰기</ButtonLight>
            )}
            {!blogInfo.blogOwner && (
              <ButtonDark className="small">구독</ButtonDark>
            )}
          </BlogWrite>
        </FlexBetween>

      </BlogAuthorDiv>

      <BlogTabMenuDiv>
        <ul>
          {tabs.map((el, index) => {
              return (
                <li key={el.index} className={el.path === currentUri ? 'active' : ''} onClick={() => handleMoveLink(el.path)}>
                  {el.title}
                </li>
              )
            }
          )}
        </ul>
      </BlogTabMenuDiv>

      <section className="py-3">
        <Outlet />
      </section>

    </ContentBody>
  );
};

export default BlogLayout;