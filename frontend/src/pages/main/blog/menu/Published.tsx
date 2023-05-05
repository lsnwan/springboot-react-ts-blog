import React, {useEffect, useRef, useState} from 'react';
import {BlogContainer} from "../../../../components/styled/myblog-styled";
import {
  BlogCard,
  BlogCardBody,
  BlogInfo, BlogInfoHeader,
  BlogThumb, BlogTitle,
  ContentContainer,
  UserProfile, UserProfileMoreButton, UserProfileName
} from "../../../../components/styled/content-styled";
import axios from "axios";
import {Path} from "@remix-run/router/history";
import {useParams} from "react-router";
import * as U from "../../../../utils";
import {AbsoluteDiv, Divider, DividerText} from "../../../../components/styled/common-styled";
import {useSelector} from "react-redux";
import {AppState} from "../../../../store";
import * as MB from "../../../../store/myblog";

type Props = {};

type PublishedBlogType = {
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

const Published = (props: Props) => {

  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const {blogPath} = useParams<string>();
  const [publishedBlog, setPublishedBlog] = useState<PublishedBlogType[]>([]);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [lastRequest, setLasRequest] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const blogInfo = useSelector<AppState, MB.State>(state => state.myBlog);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    const handleScroll = () => {
      const scrollBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight;
      if (scrollBottom) {
        if (!lastRequest || blogInfo.enabled) {
          loadBlogContent();
        }
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

  useEffect(() => {
    loadBlogContent();
  }, []);

  const loadBlogContent = async () => {

    await axios.post(`/api/blogs/${blogPath}/published`, {
      pageIndex: pageIndex,
      pageUnit: 10,
    })
    .then(res => res.data)
    .then((result: {code: string; message: string; data?:any; path: string | Partial<Path>;}) => {
      console.log(result);
      if (result.code == '200') {
        setPublishedBlog((prevItems) => [...prevItems, ...result.data]);
        setPageIndex((prev) => prev + 1);
        if (result.data.length === 0) {
          setLasRequest(true);
        }
        return;
      }

      if (result.code === 'A-004') {
        setErrorMessage(result.message);
      }

    });
  }


  return (
    <BlogContainer>
      <ContentContainer>
        {!blogInfo.enabled && (
          <AbsoluteDiv>
            <h5>비공개 블로그 입니다.</h5>
          </AbsoluteDiv>
        )}
        {publishedBlog.map((item) => (
          <BlogCard width={windowWidth} key={item.blogContentIdx}>
            <BlogThumb imagePath={item.blogThumbnailUrl === null ? '/images/no-image.png' : item.blogThumbnailUrl}></BlogThumb>
            <BlogCardBody>
              <UserProfile imagePath={item.accountProfileUrl === null ? '/images/no-profile.png' : item.accountProfileUrl}></UserProfile>
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
      </ContentContainer>
      {lastRequest && (
        <Divider>
          <DividerText className="text-center">더 이상 데이터가 없습니다.</DividerText>
        </Divider>
      )}
    </BlogContainer>
  );
};

export default Published;