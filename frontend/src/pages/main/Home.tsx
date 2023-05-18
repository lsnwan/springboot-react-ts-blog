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
  TagBadge,
  TagBody,
  UserProfile,
  UserProfileMoreButton,
  UserProfileName
} from "../../components/styled/content-styled";
import {Helmet} from "react-helmet";
import {useNavigate} from "react-router";
import axios from "axios";
import {Path} from "@remix-run/router/history";
import * as U from "../../utils";
import {useLocation} from "react-router-dom";

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

type TagType = {
  tagIdx: number;
  tagName: string;
}

const Home = () => {

  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [mainContents, setMainContents] = useState<Array<BlogContentType>>([]);
  const navigate = useNavigate();
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [lastRequest, setLastRequest] = useState<boolean>(false);
  const [selTag, setSelTag] = useState<string>('');
  const [tags, setTags] = useState<Array<TagType>>([]);
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
  }, []);

  const loadContents = async () => {
    if (!lastRequest) {
      console.log('시작!!!!!!!!!!!!!!');
      await axios.get(`/api/blogs?pageIndex=${pageIndex}&pageUnit=10&selTag=${selTag}`)
        .then(res => res.data)
        .then((result: { code: string; message: string; data?: any; path: string | Partial<Path>; }) => {
          console.log(result);

          console.log(pageIndex);
          if (result.data.length === 0) {
            setLastRequest(true);
          }
        });
    }
  }

  return (
    <ContentBody>
      <Helmet>
        <title>YouBlog</title>
      </Helmet>
      <TagBody width={windowWidth}>
        <TagBadge className="active">리액트</TagBadge>
        <TagBadge>typescript</TagBadge>
        <TagBadge>Spring</TagBadge>
        <TagBadge>SpringBoot</TagBadge>
        <TagBadge>HTML</TagBadge>
        <TagBadge>CSS</TagBadge>
        <TagBadge>JQuery</TagBadge>
        <TagBadge>전자정부프레임워크</TagBadge>
        <TagBadge>Nginx</TagBadge>
        <TagBadge>Apache</TagBadge>
        <TagBadge>Vue.js</TagBadge>
        <TagBadge>typescript</TagBadge>
        <TagBadge>Spring</TagBadge>
        <TagBadge>SpringBoot</TagBadge>
        <TagBadge>HTML</TagBadge>
        <TagBadge>CSS</TagBadge>
        <TagBadge>JQuery</TagBadge>
        <TagBadge>전자정부프레임워크</TagBadge>
        <TagBadge>Nginx</TagBadge>
        <TagBadge>Apache</TagBadge>
        <TagBadge>Vue.js</TagBadge>
      </TagBody>

      <ContentContainer width={windowWidth}>
        {mainContents.length !== 0 && mainContents.map((content) => (
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

export default Home;