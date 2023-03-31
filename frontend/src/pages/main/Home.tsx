import React, {useEffect, useState} from 'react';
import {
  BlogCard,
  BlogCardBody,
  BlogInfo,
  BlogInfoHeader,
  BlogThumb,
  BlogTitle,
  ContentBody,
  ContentContainer, TagBadge, TagBody,
  UserProfile,
  UserProfileMoreButton,
  UserProfileName
} from "../../components/styled/content-styled";
import {Helmet} from "react-helmet";
import {BsThreeDots} from "react-icons/all";

const Home = () => {

  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  let roofCnt: number = 10;

  const cardRender = () => {
    const result = [];
    for (let i = 0; i < roofCnt; i++) {
      result.push(
        <BlogCard width={windowWidth} key={i}>
          <BlogThumb></BlogThumb>
          <BlogCardBody>
            <UserProfile></UserProfile>
            <BlogInfo>
              <BlogInfoHeader>
                <UserProfileName>사용자닉네임</UserProfileName>
                <UserProfileMoreButton>1일 전</UserProfileMoreButton>
              </BlogInfoHeader>
              <BlogTitle>블로그 제목을 입력하면 그 제목이 출력되는 영역 입니다. 그러므로 게시글을 아주 자세히 잘 입력해야 겠지요?</BlogTitle>
            </BlogInfo>
          </BlogCardBody>
        </BlogCard>
      )
    }
    return result;
  };



  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
        {cardRender()}
      </ContentContainer>
    </ContentBody>
  );
};

export default Home;