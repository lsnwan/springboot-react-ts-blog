import React from 'react';
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

const Login = () => {

  return (
    <CommonBody>
      <Helmet>
        <title>YouBlog - Login</title>
      </Helmet>

      <Title>로그인</Title>

      <InputLabelBlock htmlFor="userId">이메일</InputLabelBlock>
      <InputTextBlock type="text" id="userId" />

      <InputLabelBlock htmlFor="userPw">비밀번호</InputLabelBlock>
      <InputTextBlock type="password" id="userPw" />

      <MessageBox className="center error">아이디와 비밀번호를 확인하세요</MessageBox>
      
      <ButtonPrimary className="block">로그인</ButtonPrimary>


      <FlexBetween className="mt-1">
        <MessageBox className="desc m-0">비밀번호를 잊어버렸나요?</MessageBox>
        <Link style={{fontSize: "13px"}} to="/find-password">비밀번호 찾기</Link>
      </FlexBetween>

      <FlexBetween>
        <MessageBox className="desc m-0">회원이 아니신가요?</MessageBox>
        <Link style={{fontSize: "13px"}} to="/signup">회원가입</Link>
      </FlexBetween>

      <FlexBetween className="mt-1">
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