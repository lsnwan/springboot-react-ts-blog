import React, {useEffect, useState} from 'react';
import {
  BlogCard,
  BlogCardBody,
  BlogInfo,
  BlogInfoHeader,
  BlogThumb,
  BlogTitle,
  ContentBody,
  ContentContainer,
  TitleContainer,
  UserProfile,
  UserProfileMoreButton,
  UserProfileName
} from "../../../components/styled/content-styled";
import {Helmet} from "react-helmet";
import {useNavigate} from "react-router";
import {useLocation} from "react-router-dom";
import axios from "axios";
import {Path} from "@remix-run/router/history";
import * as U from "../../../utils";

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

const ItExplore = () => {

  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [exploreContents, setExploreContents] = useState<Array<BlogContentType>>([]);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [lastRequest, setLastRequest] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    loadContents();

  }, [location]);

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
    if (!lastRequest) {
      await axios.get(`/api/explore?pageIndex=${pageIndex}&pageUnit=10&condition=IT`)
        .then(res => res.data)
        .then((result: { code: string; message: string; data?: any; path: string | Partial<Path>; }) => {

          setExploreContents((prevItems) => [...prevItems, ...result.data]);
          setPageIndex(prev => prev + 1);
          if (result.data.length === 0) {
            setLastRequest(true);
          }
        });
    }
  }

  return (
    <ContentBody>
      <Helmet>
        <title>YouBlog - 탐색</title>
      </Helmet>

      <TitleContainer width={windowWidth}>
        <h2 className="fw-semibold">IT</h2>
      </TitleContainer>

      <ContentContainer width={windowWidth}>
        {exploreContents.length !== 0 && exploreContents.map((content) => (
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

export default ItExplore;