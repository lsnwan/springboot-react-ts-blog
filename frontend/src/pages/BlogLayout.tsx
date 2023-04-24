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

  useEffect(() => {
    setCurrentUri(window.location.pathname);
  })

  const handleMyInst = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    navigate(`/${blogPath}/inst`);
  }

  return (
    <ContentBody>
      <Helmet>
        <title>{blogPath} - YouBlog</title>
      </Helmet>

      <BlogBgDiv/>

      <BlogAuthorDiv className="mt-3">
        <BlogAvatar profilePath={loggedUser?.profilePath}>
          <span className="visually-hidden">사용자 프로필</span>
        </BlogAvatar>
        <FlexBetween className="block px-2">
          <div>
            <h5 className="fw-semibold mb-0">닉네임</h5>
            <p className="mb-1">
              <span>
                <small className="fw-semibold">구독자:</small> <small>1,010</small> <small className="fw-semibold">발행한 글:</small> <small>100,102</small>
              </span>
            </p>
            <p className="mb-0">
              <LinkTeg theme={theme} href='#' onClick={handleMyInst}>
                탄핵결정은 공직으로부터 파면함에 그친다. 그러나, 이에 의하여 민사상이나 형사상의 책임이 면제되지는 아니한다.
                {/*한 회계연도를 넘어 계속하여 지출할 필요가 있을 때에는 정부는 연한을 정하여 계속비로서 국회의 의결을 얻어야 한다.*/}
                {/*국회는 국정을 감사하거나 특정한 국정사안에 대하여 조사할 수 있으며, 이에 필요한 서류의 제출 또는 증인의 출석과*/}
                {/*증언이나 의견의*/}
              </LinkTeg>
            </p>
          </div>
          <BlogWrite>
            <ButtonLight className="small">글쓰기</ButtonLight>
            <ButtonDark className="small">구독</ButtonDark>
          </BlogWrite>
        </FlexBetween>

      </BlogAuthorDiv>

      <BlogTabMenuDiv>
        <ul>
          {tabs.map((el, index) => {
              return (
                <li key={el.index} className={el.path === currentUri ? 'active' : ''} onClick={() => {
                  navigate(el.path);
                }}>
                  {el.title}
                </li>
              )
            }
          )}
        </ul>
      </BlogTabMenuDiv>

      <section className="py-3">
        {/*{tabs[activeTab].content}*/}
        <Outlet />
      </section>

    </ContentBody>
  );
};

export default BlogLayout;