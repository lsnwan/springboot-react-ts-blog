import React from 'react';
import {ContentBody} from "../../../components/styled/content-styled";
import {Helmet} from "react-helmet";
import {useAuth} from "../../../contexts";
import {useParams} from "react-router";

const Home = () => {

  const {loggedUser} = useAuth();
  const {blogPath} = useParams<string>();

  console.log(blogPath);

  return (
    <ContentBody>
      <Helmet>
        <title>[블로그 타이틀] - YouBlog</title>
      </Helmet>

      <h2>블로그 메인</h2>


    </ContentBody>
  );
};

export default Home;