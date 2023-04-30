import React, {useEffect, useState} from 'react';
import {BlogAuthorDiv, BlogAvatar, BlogBgDiv, BlogTabMenuDiv, BlogWrite,} from "../components/styled/myblog-styled";
import {Helmet} from "react-helmet";
import {useNavigate, useParams} from "react-router";
import {AbsoluteDiv, ButtonDark, ButtonLight, FlexBetween, LinkTeg} from "../components/styled/common-styled";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../store";
import * as T from "../store/theme";
import * as MB from "../store/myblog";
import {ContentBody} from "../components/styled/content-styled";
import {Outlet} from "react-router-dom";
import axios from "axios";
import {Path} from "@remix-run/router/history";
import {MyBlogInfoState} from "../store/CommonTypes";

const BlogLayout = () => {

  const theme = useSelector<AppState, T.State>(state => state.themeType);
  const [currentUri, setCurrentUri] = useState<string>('');
  const {blogPath} = useParams<string>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tabs = [
    {index: 0, title: '홈', path: `/${blogPath}`},
    {index: 1, title: '게시글', path: `/${blogPath}/published`},
    {index: 2, title: '정보', path: `/${blogPath}/inst`},
    {index: 3, title: '설정', path: `/${blogPath}/settings`},
  ];
  const blogInfo = useSelector<AppState, MB.State>(state => state.myBlog);

  useEffect(() => {
    setCurrentUri(window.location.pathname);
  });

  useEffect(() => {
    axios.get(`/api/blogs/${blogPath}/info`)
      .then(res => res.data)
      .then((result: {code: string; message: string; path: string | Partial<Path>; data: MyBlogInfoState;}) => {
        if (result.code !== '200') {
          alert(result.message);
          navigate(result.path);
          return;
        }

        // setBlogInfo(result.data);
        dispatch({type: '@myBlogInfo/setMyBlogInfo', payload: result.data});
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

      {!blogInfo.blogOwner && !blogInfo.enabled && (
        <>
          <AbsoluteDiv>
            <h5>비공개 블로그 입니다.</h5>
          </AbsoluteDiv>
        </>
      )}


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
               {blogInfo.blogIntro && (
                 <>
                   {blogInfo.blogIntro.split('\n').length > 1 && (
                     <>
                       {blogInfo.blogIntro.substring(0, blogInfo.blogIntro.indexOf('\n'))} ...
                     </>
                   )}
                   {blogInfo.blogIntro.split('\n').length < 2 && (
                     <>
                       {blogInfo.blogIntro}
                     </>
                   )}
                 </>
               )}
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
       <Outlet context={{blogInfo}} />
     </section>

    </ContentBody>
  );
};

export default BlogLayout;