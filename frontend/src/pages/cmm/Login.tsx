import React, {ChangeEvent, useState} from 'react';
import {
  ButtonPrimary,
  CommonBody,
  Divider,
  DividerText,
  FlexBetween,
  InputLabelBlock,
  InputTextBlock,
  MessageBox,
  Title,
} from "../../components/styled/common-styled";
import {Helmet} from "react-helmet";
import {Link} from "react-router-dom";
import axios from 'axios';
import * as Utils from "../../utils";

const Login = () => {

  const [userId, setUserId] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios.post("/API/login", {
      userEmail: userId,
      userPw: userPassword
    })
    .then(response => {
      console.log(response.data);
      if (response.data.code === '200') {
        alert('로그인 성공');
      } else {
        alert(response.data.message);
      }
    })
    .catch(error => {
      console.error(error);
    });

  }

  return (
    <CommonBody>
      <Helmet>
        <title>YouBlog - 로그인</title>
      </Helmet>

      <Title>로그인</Title>

      <form onSubmit={handleSubmit}>
        <InputLabelBlock htmlFor="userId" className="mt-3">이메일</InputLabelBlock>
        <InputTextBlock type="text" id="userId" onChange={(e: ChangeEvent<HTMLInputElement>) => setUserId(e.target.value)} />

        <InputLabelBlock htmlFor="userPw" className="mt-3">비밀번호</InputLabelBlock>
        <InputTextBlock type="password" id="userPw" onChange={(e: ChangeEvent<HTMLInputElement>) => setUserPassword(e.target.value)} />

        <MessageBox className="center error">아이디와 비밀번호를 확인하세요</MessageBox>

        <ButtonPrimary className="block mt-3" type="submit">로그인</ButtonPrimary>
      </form>

      <FlexBetween className="mt-3">
        <MessageBox className="desc m-0">비밀번호를 잊어버렸나요?</MessageBox>
        <Link style={{fontSize: "13px"}} to="/find-password">비밀번호 찾기</Link>
      </FlexBetween>

      <FlexBetween>
        <MessageBox className="desc m-0">회원이 아니신가요?</MessageBox>
        <Link style={{fontSize: "13px"}} to="/signup">회원가입</Link>
      </FlexBetween>

      <FlexBetween className="mt-3 mb-3">
        <Divider/>
        <DividerText>OR</DividerText>
        <Divider/>
      </FlexBetween>


      <FlexBetween>
        <div style={{width: "70px", height: "70px", backgroundColor: "#999", borderRadius: "100%", textAlign: "center", lineHeight: "70px", fontSize: "20px"}}>
          K
        </div>
        <div style={{width: "70px", height: "70px", backgroundColor: "#999", borderRadius: "100%", textAlign: "center", lineHeight: "70px", fontSize: "20px"}}>
          N
        </div>
        <div style={{width: "70px", height: "70px", backgroundColor: "#999", borderRadius: "100%", textAlign: "center", lineHeight: "70px", fontSize: "20px"}}>
          G
        </div>
        <div style={{width: "70px", height: "70px", backgroundColor: "#999", borderRadius: "100%", textAlign: "center", lineHeight: "70px", fontSize: "20px"}}>
          A
        </div>
      </FlexBetween>

    </CommonBody>
  );
};

export default Login;