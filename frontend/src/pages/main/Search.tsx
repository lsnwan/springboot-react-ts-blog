import React, {useEffect, useState} from 'react';
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
  const [lastRequest, setLastRequest] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    setPreviousQueryString(currentQueryString);
    setCurrentQueryString(searchParams.get("keyword")!);
  }, [location]);

  useEffect(() => {
    console.log(previousQueryString + " :: " + currentQueryString);
    if (previousQueryString !== currentQueryString) {
      if (previousQueryString !== '') {
        setPageIndex(1);
        setSearchContents([]);
      }
      loadContents();
    }
  }, [previousQueryString, currentQueryString]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    const handleScroll = () => {
      const scrollBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight;
      if (scrollBottom) {
        loadContents();
      }
    }

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    // cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  });

  const loadContents = async () => {
    console.log("loadContents !!!!!!!!!!!");
    if (!lastRequest) {

      await axios.get(`/api/blogs/search?pageIndex=${pageIndex}&pageUnit=10&keyword=${searchParams.get("keyword")}`)
        .then(res => res.data)
        .then((result: { code: string; message: string; data?: any; path: string | Partial<Path>; }) => {

          setPageIndex(prevState => prevState + 1);
          setSearchContents((prevItems) => [...prevItems, ...result.data]);

          if (result.data.length === 0) {
            setLastRequest(true);
          }
        });
    }
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
        {searchContents.length !== 0 && searchContents.map((content) => (
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
        ))}
      </ContentContainer>

    </ContentBody>
  );
};

export default Search;