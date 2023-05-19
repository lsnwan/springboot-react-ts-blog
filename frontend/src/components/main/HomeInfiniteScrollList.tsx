import React, {useEffect, useRef, useState} from 'react';
import {BlogContentType, RadioCheckBoxType} from "../cmm/CommonType";
import axios from "axios";
import {
  BlogCard,
  BlogCardBody,
  BlogInfo,
  BlogInfoHeader,
  BlogThumb,
  BlogTitle,
  ContentContainer,
  TagBadge,
  TagBody,
  UserProfile,
  UserProfileMoreButton,
  UserProfileName
} from "../styled/content-styled";
import * as U from "../../utils";
import {useNavigate} from "react-router";
import RadioCheckBox from "../cmm/RadioCheckBox";

type Props = {};

const HomeInfiniteScrollList = (props: Props) => {

  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [contents, setContents] = useState<Array<BlogContentType>>([]);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [tags, setTags] = useState<Array<RadioCheckBoxType>>([{
    label: '전체',
    value: '전체'
  }]);
  const [selTag, setSelTag] = useState<string>('전체');

  const navigate = useNavigate();

  const contentBoxRef = useRef<HTMLDivElement>(null);
  const observerRef = React.useRef<IntersectionObserver>();
  const boxRef = React.useRef<HTMLDivElement>(null);
  const [endList, setEndList] = useState<boolean>(false);

  useEffect(() => {
    TagFetchData();
  }, []);

  useEffect(() => {
    fetchData(pageIndex, selTag);
  }, [pageIndex, selTag]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(intersectionObserver); // IntersectionObserver
    boxRef.current && observerRef.current.observe(boxRef.current);
  }, [contents]);

  // IntersectionObserver 설정
  const intersectionObserver = (entries: IntersectionObserverEntry[], io: IntersectionObserver) => {
    entries.forEach((entry) => {
      if(entry.isIntersecting) {
        if (!endList) {
          io.unobserve(entry.target);
          setPageIndex((prevIndex) => prevIndex + 1);
        }
      }
    })
  }

  const TagFetchData = async () => {
    const response = await axios.get("/api/tags");
    const tagList = response.data.data;
    if (tagList.length !== 0) {
      for (let i = 0; i < tagList.length; i++) {
        setTags((prevList) => [...prevList, {
          label: tagList[i],
          value: tagList[i]
        }]);
      }
    }
  }

  const fetchData = async (page: number, tag?: string) => {
    const response = await axios.get(`/api/blogs?pageIndex=${page}&pageUnit=10&selTag=${tag === '전체' ? '' : tag}`);
    const newData = response.data.data;

    if (newData.length === 0) {
      setEndList(true);
    }

    if (page === 1) {
      setContents(newData);
      return;
    }

    setContents((prevList) => [...prevList, ...newData]);

  };

  const handleTagChange = (tag: string) => {
    setEndList(false);
    setSelTag(tag);
    setPageIndex(1);
  };

  return (
    <>
      <TagBody width={windowWidth}>
        <RadioCheckBox labelStyle={{padding: "5px 7px"}} options={tags} initValue={selTag} name="category" onChange={handleTagChange} />
      </TagBody>

      <ContentContainer width={windowWidth} ref={contentBoxRef}>
        {contents.length !== 0 && contents.map((content, index) => {
          if (contents.length - 1 === index) {
            return (
              <BlogCard width={windowWidth} key={content.blogContentIdx} ref={boxRef} onClick={() => navigate(`/@${content.blogPathName}/view?id=${content.blogContentIdx}`)}>
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
            )
          }
          else {
            return (
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
            )
          }
        })}
      </ContentContainer>
    </>
  );
};

export default HomeInfiniteScrollList;