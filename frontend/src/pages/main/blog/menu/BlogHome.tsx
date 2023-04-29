import React from 'react';
import {BlogContainer, BlogStatCard} from "../../../../components/styled/myblog-styled";
import GitHubCalendar from "react-github-contribution-calendar";
import {AbsoluteDiv, RelativeDiv} from "../../../../components/styled/common-styled";
import {
  BlogCard,
  BlogCardBody,
  BlogInfo,
  BlogInfoHeader,
  BlogThumb, BlogTitle,
  UserProfile, UserProfileMoreButton, UserProfileName
} from "../../../../components/styled/content-styled";
import {useSelector} from "react-redux";
import {AppState} from "../../../../store";
import * as T from "../../../../store/theme";
import * as MB from "../../../../store/myblog";

type Props = {};

const values = {
  '2023-03-21': 1,
  '2023-03-22': 3,
  '2023-03-23': 2,
  '2023-03-24': 6,
  '2023-03-25': 5,
  '2023-03-26': 4,
  '2023-03-27': 9,
  '2023-03-28': 8,
  '2023-03-29': 7,
}

const until = '2023-4-25';

const monthNames = ['1','2','3','4','5','6','7','8','9','10','11','12',];
const weekNames = ['일','월','화','수','목','금','토',];

const panelColors = [
  '#dcdcdc',
  '#5ec9e1',
  '#4ab3cb',
  '#369bb2',
  '#2791a9',
  '#19869f',
  '#10758c',
  '#09687e',
  '#034f60',
  '#004250',
];

const monthLabelAttributes = {
  'style': {
    'textDecoration': 'underline',
    'fontSize': 12,
    'alignmentBaseline': 'central',
    'fill': '#AAA'
  }
};


const BlogHome = (props: Props) => {
  const theme = useSelector<AppState, T.State>(state => state.themeType);
  const blogInfo = useSelector<AppState, MB.State>(state => state.myBlog);
  console.log(blogInfo);

  return (
    <BlogContainer>

      {!blogInfo.enabled && (
        <>
          <AbsoluteDiv>
            <h5>비공개 블로그 입니다.</h5>
          </AbsoluteDiv>
        </>
      )}

      {blogInfo.enabled && (
        <>
          <RelativeDiv>
            <GitHubCalendar monthLabelAttributes={monthLabelAttributes}
                            panelAttributes={undefined}
                            weekLabelAttributes={undefined}
                            values={values}
                            until={until}
                            monthNames={monthNames}
                            weekNames={weekNames}
                            panelColors={panelColors}/>
            <AbsoluteDiv top="9px" right="-10px" width="380px" height="105px" style={{display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap'}}>
              <BlogStatCard theme={theme}>
                <h5>전일 방문자</h5>
                <p>50,000</p>
              </BlogStatCard>

              <BlogStatCard theme={theme} style={{marginLeft: '5px'}}>
                <h5>누적 방문자</h5>
                <p>500,000</p>
              </BlogStatCard>
            </AbsoluteDiv>
          </RelativeDiv>

          <div style={{marginTop: '10px'}}>
            <h5>최신 게시글</h5>
            <div style={{display: 'flex'}}>
              <BlogCard>
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
              <BlogCard>
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
              <BlogCard>
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
            </div>
          </div>

          <div style={{marginTop: '10px'}}>
            <h5>인기 게시글</h5>
            <div style={{display: 'flex'}}>
              <BlogCard>
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
              <BlogCard>
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
              <BlogCard>
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
            </div>
          </div>
        </>
      )}
    </BlogContainer>
  );
};

export default BlogHome;