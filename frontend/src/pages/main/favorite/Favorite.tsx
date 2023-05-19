import React, {useEffect, useState} from 'react';
import {
  BlogCard,
  BlogCardBody, BlogInfo, BlogInfoHeader,
  BlogThumb, BlogTitle,
  ContentBody,
  ContentContainer, TitleContainer,
  UserProfile, UserProfileMoreButton, UserProfileName
} from "../../../components/styled/content-styled";
import {Helmet} from "react-helmet";
import {useLocation} from "react-router-dom";
import axios from "axios";
import {Path} from "@remix-run/router/history";
import {useNavigate} from "react-router";
import * as U from "../../../utils";

type MyFavoriteType = {
  blogPathName: string;
  contentAccountNickname: string;
  contentAccountProfile: string;
  contentCategory: string;
  contentIdx: number;
  contentTitle: string;
  modifiedDate: string;
  registeredDate: string;
  contentThumbnail: string;
}
const Favorite = () => {

  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [myFavorites, setMyFavorites] = useState<Array<MyFavoriteType>>([]);
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    axios.get('/api/favorite')
      .then(res => res.data)
      .then((result: {code: string; message: string; data?:any; path: string | Partial<Path>;}) => {
        if (result.code === '200') {
          setMyFavorites(result.data);
          return;
        }

        if (result.code === 'A-001') {
          navigate('/login');
        }
      });

  }, [location]);

  return (
    <ContentBody>
      <Helmet>
        <title>YouBlog - 즐겨찾기</title>
      </Helmet>

      <TitleContainer width={windowWidth}>
        <h2 className="fw-semibold">즐겨찾기</h2>
      </TitleContainer>

      <ContentContainer width={windowWidth}>
        {myFavorites.length !== 0 && myFavorites.map((my) => (
          <BlogCard width={windowWidth} key={my.contentIdx} onClick={() => navigate(`/@${my.blogPathName}/view?id=${my.contentIdx}`)}>
            <BlogThumb imagePath={my.contentThumbnail === null ? '/images/no-image.png' : my.contentThumbnail} />
            <BlogCardBody>
              <UserProfile imagePath={my.contentAccountProfile === null ? '/images/no-profile.png' : my.contentAccountProfile} />
              <BlogInfo>
                <BlogInfoHeader>
                  <UserProfileName>{my.contentAccountNickname}</UserProfileName>
                  <UserProfileMoreButton>{U.formatDate(my.registeredDate)}</UserProfileMoreButton>
                </BlogInfoHeader>
                <BlogTitle>{my.contentTitle}</BlogTitle>
              </BlogInfo>
            </BlogCardBody>
          </BlogCard>
        )) || (
          <div className="flex-grow-1 text-center">
            <span className="fw-semibold">즐겨찾기한 게시글이 없습니다.</span>
          </div>
        )}
      </ContentContainer>

    </ContentBody>
  );
};

export default Favorite;