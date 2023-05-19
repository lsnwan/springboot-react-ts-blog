import React, {useEffect, useRef, useState} from 'react';
import {
  BlogCard,
  BlogCardBody, BlogInfo, BlogInfoHeader,
  BlogThumb, BlogTitle,
  ContentBody, ContentContainer,
  TitleContainer,
  UserProfile, UserProfileMoreButton, UserProfileName
} from "../../components/styled/content-styled";
import {Helmet} from "react-helmet";
import {useLocation, useSearchParams} from "react-router-dom";
import axios from "axios";
import {Path} from "@remix-run/router/history";
import {useNavigate} from "react-router";
import * as U from "../../utils";

type BlogContentType = {
  blogContentIdx: number;
  blogPathName: string;
  blogThumbnailUrl: string;
  registeredDate: string;
  modifiedDate: string;
  blogTitle: string;
  contentEnabled: boolean;
  blogEnabled: boolean;
  accountNickname: string;
  accountProfileUrl: string;
}

const Search = () => {

  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [searchParams, setSearchParams] = useSearchParams();

  const [previousQueryString, setPreviousQueryString] = useState<string>('');
  const [currentQueryString, setCurrentQueryString] = useState<string>('');

  const [initSearch, setInitSearch] = useState<boolean>(false);

  const [searchContents, setSearchContents] = useState<Array<BlogContentType>>([]);
  const navigate = useNavigate();
  const location = useLocation();

  const contentBoxRef = useRef<HTMLDivElement>(null);
  const observerRef = React.useRef<IntersectionObserver>();
  const boxRef = React.useRef<HTMLDivElement>(null);
  const [endList, setEndList] = useState<boolean>(false);

  useEffect(() => {
    loadContents(pageIndex, currentQueryString);
  }, [pageIndex, currentQueryString]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(intersectionObserver); // IntersectionObserver
    boxRef.current && observerRef.current.observe(boxRef.current);
  }, [searchContents]);

  useEffect(() => {
    setPreviousQueryString(currentQueryString);
    setCurrentQueryString(searchParams.get("keyword")!);
  }, [location]);

  const intersectionObserver = (entries: IntersectionObserverEntry[], io: IntersectionObserver) => {
    entries.forEach((entry) => {
      if(entry.isIntersecting) {
        if (!endList) {
          io.unobserve(entry.target);
          setPageIndex((prevIndex) => prevIndex + 1);
        }
      }
    })
  }

  useEffect(() => {
    if (previousQueryString !== currentQueryString) {
      if (previousQueryString !== '') {
        setPageIndex(1);
        setSearchContents([]);
        setEndList(false);
      }
    }
  }, [previousQueryString, currentQueryString]);


  const loadContents = async (page: number, keyword: string) => {

    await axios.get(`/api/blogs/search?pageIndex=${page}&pageUnit=10&keyword=${keyword}`)
      .then(res => res.data)
      .then((result: { code: string; message: string; data?: any; path: string | Partial<Path>; }) => {

        if (result.data.length === 0) {
          setEndList(true);
        }

        if (page === 1) {
          setSearchContents(result.data);
          return;
        }

        setSearchContents((prevItems) => [...prevItems, ...result.data]);

      });
  }

  return (
    <ContentBody>
      <Helmet>
        <title>{searchParams.get("keyword")} - YouBlog</title>
      </Helmet>

      <TitleContainer width={windowWidth}>
        <h2 className="fw-semibold"><span>{searchParams.get("keyword")}</span> 검색</h2>
      </TitleContainer>

      <ContentContainer width={windowWidth}>
        {searchContents.length !== 0 && searchContents.map((content, index) => {
          if (searchContents.length - 1 === index) {
            return (
              <BlogCard width={windowWidth} key={content.blogContentIdx} ref={boxRef} onClick={() => navigate(`/@${content.blogPathName}/view?id=${content.blogContentIdx}`)}>
                <BlogThumb imagePath={content.blogThumbnailUrl === null ? '/images/no-image.png' : content.blogThumbnailUrl} />
                <BlogCardBody>
                  <UserProfile imagePath={content.accountProfileUrl === null ? '/images/no-profile.png' : content.accountProfileUrl} />
                  <BlogInfo>
                    <BlogInfoHeader>
                      <UserProfileName>{content.accountNickname}</UserProfileName>
                      <UserProfileMoreButton>{U.formatDate(content.registeredDate)}</UserProfileMoreButton>
                    </BlogInfoHeader>
                    <BlogTitle>{content.blogTitle}</BlogTitle>
                  </BlogInfo>
                </BlogCardBody>
              </BlogCard>
            )
          } else {
            return (
              <BlogCard width={windowWidth} key={content.blogContentIdx} onClick={() => navigate(`/@${content.blogPathName}/view?id=${content.blogContentIdx}`)}>
                <BlogThumb imagePath={content.blogThumbnailUrl === null ? '/images/no-image.png' : content.blogThumbnailUrl} />
                <BlogCardBody>
                  <UserProfile imagePath={content.accountProfileUrl === null ? '/images/no-profile.png' : content.accountProfileUrl} />
                  <BlogInfo>
                    <BlogInfoHeader>
                      <UserProfileName>{content.accountNickname}</UserProfileName>
                      <UserProfileMoreButton>{U.formatDate(content.registeredDate)}</UserProfileMoreButton>
                    </BlogInfoHeader>
                    <BlogTitle>{content.blogTitle}</BlogTitle>
                  </BlogInfo>
                </BlogCardBody>
              </BlogCard>
            )
          }
        }) || (
          <>
            <h2>데이터를 찾지 못했습니다.</h2>
          </>
        )}
      </ContentContainer>

    </ContentBody>
  );
};

export default Search;