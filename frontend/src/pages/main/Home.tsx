import React, {useState} from 'react';
import {ContentBody, TagBadge, TagBody} from "../../components/styled/content-styled";
import {Helmet} from "react-helmet";
import HomeInfiniteScrollList from "../../components/main/HomeInfiniteScrollList";

const Home = () => {



  return (
    <ContentBody>
      <Helmet>
        <title>YouBlog</title>
      </Helmet>

      <HomeInfiniteScrollList/>

    </ContentBody>
  );
};

export default Home;