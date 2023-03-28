import React from 'react';
import {CommonBody, CommonTitle} from "../../components/styled/common-styled";
import {Helmet} from "react-helmet";

const Login = () => {
  return (
    <CommonBody>
      <Helmet>
        <title>YouBlog - Login</title>
      </Helmet>
      <CommonTitle>로그인</CommonTitle>
      Login 페이지
    </CommonBody>
  );
};

export default Login;