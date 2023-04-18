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

const FindPassword = () => {

  const theme = useSelector<AppState, T.State>(state => state.themeType);

  return (
    <CommonBody theme={theme}>
      <Helmet>
        <title>YouBlog - 비밀번호 찾기</title>
      </Helmet>

      <Title className="mb-5">비밀번호 찾기</Title>

      <div className="mb-2">
        <InputLabelBlock htmlFor="userId">이메일</InputLabelBlock>
        <InputTextBlock type="text" id="userId" />
        <MessageBox className="error">이메일 형식으로 입력하세요</MessageBox>
      </div>

      <div className="mt-3">
        <ButtonPrimary className="block">비밀번호 찾기</ButtonPrimary>
      </div>
      
      <FlexBetween className="mt-3">
        <MessageBox className="desc m-0">이미 회원이신가요?</MessageBox>
        <Link style={{fontSize: "13px"}} to="/login">로그인</Link>
      </FlexBetween>

      <FlexBetween>
        <MessageBox className="desc m-0">회원이 아니신가요?</MessageBox>
        <Link style={{fontSize: "13px"}} to="/signup">회원가입</Link>
      </FlexBetween>
      
      
    </CommonBody>
  );
};

export default FindPassword;