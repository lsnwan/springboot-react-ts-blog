import React from 'react';
import {BlogContainer} from "../../../../components/styled/myblog-styled";
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
    'text-decoration': 'underline',
    'font-size': 12,
    'alignment-baseline': 'central',
    'fill': '#AAA'
  }
};

const BlogHome = (props: Props) => {

  return (
    <BlogContainer>
      <RelativeDiv>
        <GitHubCalendar monthLabelAttributes={monthLabelAttributes}
                        panelAttributes={undefined}
                        weekLabelAttributes={undefined}
                        values={values}
                        until={until}
                        monthNames={monthNames}
                        weekNames={weekNames}
                        panelColors={panelColors}/>
        <AbsoluteDiv top="0" right="0" width="380px" height="105px" style={{display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap'}}>
          <div style={{width: '180px', height: '100px', borderRadius: '10px', backgroundColor: '#252525', padding: '15px 10px'}}>
            <h5 style={{fontSize: '16px', fontWeight: 'bold'}}>전일 방문자</h5>
            <p style={{fontSize: '30px'}}>500,000</p>
          </div>
          <div style={{width: '180px', height: '100px', borderRadius: '10px', backgroundColor: '#252525', padding: '15px 10px', marginLeft: '10px'}}>
            <h5 style={{fontSize: '16px', fontWeight: 'bold'}}>누적 방문자</h5>
            <p style={{fontSize: '30px'}}>500</p>
          </div>
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
    </BlogContainer>
  );
};

export default BlogHome;