import React, {useEffect, useState} from 'react';
import {BlogContainer, BlogStatCard} from "../../../../components/styled/myblog-styled";
import GitHubCalendar from "react-github-contribution-calendar";
import {AbsoluteDiv, RelativeDiv} from "../../../../components/styled/common-styled";
import {
  BlogCard,
  BlogCardBody,
  BlogInfo,
  BlogInfoHeader,
  BlogThumb,
  BlogTitle,
  UserProfile,
  UserProfileMoreButton,
  UserProfileName
} from "../../../../components/styled/content-styled";
import {useSelector} from "react-redux";
import {AppState} from "../../../../store";
import * as T from "../../../../store/theme";
import * as MB from "../../../../store/myblog";
import axios from "axios";
import {useParams} from "react-router";
import {Path} from "@remix-run/router/history";
import * as U from "../../../../utils";



type Props = {};

const date = new Date();
const year = date.getFullYear();
const month = (date.getMonth() + 1).toString().padStart(2, '0');
const day = date.getDate().toString().padStart(2, '0');
const today = `${year}-${month}-${day}`;

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


type RecentBlogType = {
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

type CalendarType = {
  [date: string]: number;
}

const BlogHome = (props: Props) => {

  const theme = useSelector<AppState, T.State>(state => state.themeType);
  const blogInfo = useSelector<AppState, MB.State>(state => state.myBlog);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const {blogPath} = useParams<string>();

  const [recentBlog, setRecentBlog] = useState<Array<RecentBlogType>>([]);
  const [registeredCalendar, setRegisteredCalendar] = useState<CalendarType>({});

  useEffect(() => {

    axios.post(`/api/blogs/${blogPath}`, {
      pageIndex: 1,
      pageNum: 1,
      pageUnit: 3
    })
      .then(res => res.data)
      .then((result: {code: string; message: string; data?:any; path: string | Partial<Path>;}) => {
        console.log(result);

        if (result.code == '200') {
          const calendar: CalendarType = {};
          result.data.calendar.forEach((item: { registeredDate: string; blogCnt: number }) => {
            calendar[item.registeredDate] = item.blogCnt;
          });
          setRecentBlog(result.data.blogContents);
          setRegisteredCalendar(calendar);
        }

        setIsLoading(false);
      });



  }, []);

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
          <GitHubCalendar monthLabelAttributes={monthLabelAttributes}
                          panelAttributes={undefined}
                          weekLabelAttributes={undefined}
                          values={registeredCalendar}
                          until={today}
                          monthNames={monthNames}
                          weekNames={weekNames}
                          panelColors={panelColors}/>


          <div style={{marginTop: '10px'}}>
            <h5>최신 게시글</h5>
            <div style={{display: 'flex'}}>
              {recentBlog.length === 0 && (
                <>
                  등록한 글이 없습니다.
                </>
              )}

              {recentBlog.map((item) => (
                <BlogCard key={item.blogContentIdx}>
                  <BlogThumb imagePath={item.blogThumbnailUrl === null ? '/images/no-image.png' : item.blogThumbnailUrl}></BlogThumb>
                  <BlogCardBody>
                    <UserProfile imagePath={item.accountProfileUrl === null ? '/images/no-image.png' : item.accountProfileUrl}></UserProfile>
                    <BlogInfo>
                      <BlogInfoHeader>
                        <UserProfileName>{item.accountNickname}</UserProfileName>
                        <UserProfileMoreButton>{U.formatDate(item.registeredDate)}</UserProfileMoreButton>
                      </BlogInfoHeader>
                      <BlogTitle>{item.blogTitle}</BlogTitle>
                    </BlogInfo>
                  </BlogCardBody>
                </BlogCard>
              ))}
            </div>
          </div>

        </>
      )}
    </BlogContainer>
  );
};

export default BlogHome;