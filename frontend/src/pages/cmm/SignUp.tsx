import React from 'react';
import {
  ButtonPrimary,
  CommonBody,
  FlexBetween,
  InputLabelBlock,
  InputTextBlock,
  MessageBox,
  Title,
} from "../../components/styled/common-styled";
import {Helmet} from "react-helmet";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {AppState} from "../../store";
import * as T from "../../store/theme";

const SignUp = () => {

  const theme = useSelector<AppState, T.State>(state => state.themeType);

  return (
    <CommonBody theme={theme}>
      <Helmet>
        <title>YouBlog - 회원가입</title>
      </Helmet>

      <Title className="mb-5">회원가입</Title>

      <div className="mb-2">
        <InputLabelBlock htmlFor="userId">이메일</InputLabelBlock>
        <InputTextBlock theme={theme} type="text" id="userId" />
        <MessageBox className="error">이메일 형식으로 입력하세요</MessageBox>
      </div>

      <div  className="mb-2">
        <InputLabelBlock htmlFor="userPw">비밀번호</InputLabelBlock>
        <InputTextBlock theme={theme} type="password" id="userPw" />
        <MessageBox className="error">8 ~ 20자 내외로 입력하세요</MessageBox>
      </div>

      <div  className="mb-2">
        <InputLabelBlock htmlFor="pwConfirm">비밀번호 확인</InputLabelBlock>
        <InputTextBlock theme={theme} type="password" id="pwConfirm" />
        <MessageBox className="error">8 ~ 20자 내외로 입력하세요</MessageBox>
      </div>

      <div className="mt-3">
        <ButtonPrimary className="block">회원가입</ButtonPrimary>
      </div>

      <FlexBetween className="mt-3">
        <MessageBox className="desc m-0">이미 회원이신가요?</MessageBox>
        <Link style={{fontSize: "13px"}} to="/login">로그인</Link>
      </FlexBetween>

      <FlexBetween className="mt-1">
        <MessageBox className="desc m-0">비밀번호를 잊어버렸나요?</MessageBox>
        <Link style={{fontSize: "13px"}} to="/find-password">비밀번호 찾기</Link>
      </FlexBetween>

    </CommonBody>
  );
};

export default SignUp;