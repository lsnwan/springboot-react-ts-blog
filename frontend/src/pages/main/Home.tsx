import React from 'react';
import {Container, ContentBody} from "../../components/styled/content-styled";
import {Helmet} from "react-helmet";

const Home = () => {

  return (
    <ContentBody>
      <Helmet>
        <title>YouBlog</title>
      </Helmet>
      <Container>
        메인 페이지
      </Container>
    </ContentBody>
  );
};

export default Home;