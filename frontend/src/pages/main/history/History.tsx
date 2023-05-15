import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router";
import {useLocation} from "react-router-dom";
import {
  BlogCard,
  BlogCardBody, BlogInfo, BlogInfoHeader,
  BlogThumb, BlogTitle,
  ContentBody, ContentContainer, HistoryDate,
  TitleContainer, UserProfile, UserProfileMoreButton, UserProfileName
} from "../../../components/styled/content-styled";
import {Helmet} from "react-helmet";
import axios from "axios";
import {Path} from "@remix-run/router/history";
import * as U from "../../../utils";

type MyHistoriesType = {
  historyDate: string;
  historyContents: Array<HistoryContentType>
}

type HistoryContentType = {
  contentIdx: number;
  blogCategory: string;
  contentTitle: string;
  blogPathName: string;
  contentThumbnail: string;
  contentRegisteredDate: string;
  contentEnabled: boolean;
  accountProfile: string;
  accountNickname: string;
}

const History = () => {

  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [myHistories, setMyHistories] = useState<Array<MyHistoriesType>>([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    axios.get('/api/history?pageIndex=1&pageUnit=100')
      .then(res => res.data)
      .then((result: { code: string; message: string; data?: any; path: string | Partial<Path>; }) => {
        console.log(result);

        if (result.code === 'A-001') {
          navigate('/login');
          return;
        }

        setMyHistories(result.data);
      });
  }, [location]);

  return (
    <ContentBody>
      <Helmet>
        <title>YouBlog - 이력</title>
      </Helmet>

      <TitleContainer width={windowWidth}>
        <h2 className="fw-semibold">이력</h2>
      </TitleContainer>

      {myHistories.length !== 0 && myHistories.map((histories, index) => (
        <ContentContainer width={windowWidth} key={index}>
          <HistoryDate>{histories.historyDate}</HistoryDate>
          <ContentContainer width={windowWidth}>
          {histories.historyContents.map((content, index) => (
            <BlogCard width={windowWidth} key={content.contentIdx} onClick={() => navigate(`/@${content.blogPathName}/view?id=${content.contentIdx}`)}>
              <BlogThumb imagePath={content.contentThumbnail === null ? '/images/no-image.png' : content.contentThumbnail} />
              <BlogCardBody>
                <UserProfile imagePath={content.accountProfile === null ? '/images/no-profile.png' : content.accountProfile} />
                <BlogInfo>
                  <BlogInfoHeader>
                    <UserProfileName>{content.accountNickname}</UserProfileName>
                    <UserProfileMoreButton>{U.formatDate(content.contentRegisteredDate)}</UserProfileMoreButton>
                  </BlogInfoHeader>
                  <BlogTitle>{content.contentTitle}</BlogTitle>
                </BlogInfo>
              </BlogCardBody>
            </BlogCard>
          )) || (
            <div className="flex-grow-1 text-center">
              <span className="fw-semibold">열람한 게시글이 없습니다.</span>
            </div>
          )}
          </ContentContainer>
        </ContentContainer>
      ))}

    </ContentBody>
  );
};

export default History;