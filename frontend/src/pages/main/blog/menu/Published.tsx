import React, {useState} from 'react';
import {BlogContainer} from "../../../../components/styled/myblog-styled";
import {
  BlogCard,
  BlogCardBody,
  BlogInfo,
  BlogInfoHeader,
  BlogThumb,
  BlogTitle,
  ContentContainer,
  UserProfile,
  UserProfileMoreButton,
  UserProfileName
} from "../../../../components/styled/content-styled";

type Props = {};

const Published = (props: Props) => {

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

  return (
    <BlogContainer>
      <ContentContainer>
        {cardRender()}
      </ContentContainer>
    </BlogContainer>
  );
};

export default Published;