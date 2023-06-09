import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import {
  ButtonPrimary,
  CommonBody,
  CommonCardSection,
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
import {useNavigate} from "react-router";
import {useAuth} from "../../contexts";
import {useSelector} from "react-redux";
import {AppState} from "../../store";
import * as T from "../../store/theme";

const Login = () => {

  const theme = useSelector<AppState, T.State>(state => state.themeType);

  const [userId, setUserId] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');
  const navigate = useNavigate();
  const {login} = useAuth();
  const [message, setMessage] = useState<string|undefined>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    login(userId, userPassword, (message) => {
      if (message === undefined) {
        navigate('/')
      }

      setMessage(message);

    });
  }

  useEffect(() => {
    setUserId("admin@admin.admin");
    setUserPassword("1234");
    if (inputRef.current !== null) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <CommonBody>
      <Helmet>
        <title>YouBlog - 로그인</title>
      </Helmet>

      <CommonCardSection theme={theme}>
        <Title>로그인</Title>

        <form onSubmit={handleSubmit}>
          <InputLabelBlock htmlFor="userId" className="mt-3">이메일</InputLabelBlock>
          <InputTextBlock theme={theme} type="text" id="userId" onChange={(e: ChangeEvent<HTMLInputElement>) => setUserId(e.target.value)} ref={inputRef} value={userId} />

          <InputLabelBlock htmlFor="userPw" className="mt-3">비밀번호</InputLabelBlock>
          <InputTextBlock theme={theme} type="password" id="userPw" onChange={(e: ChangeEvent<HTMLInputElement>) => setUserPassword(e.target.value)} value={userPassword} />

          {message !== '' && (
            <MessageBox className="center error">{message}</MessageBox>
          )}

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
          <div>
            <a href="https://kauth.kakao.com/oauth/authorize?client_id=8f7a0bdb3dafcf6fd332a067be4273c5&redirect_uri=http://localhost:5173/oauth/kakao/callback&response_type=code">
              <img src="/icon/kakao.jpg" alt="카카오 간편 로그인" style={{width: '70px', height: '70px', borderRadius: '50%'}}/>
            </a>
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
      </CommonCardSection>

    </CommonBody>
  );
};

export default Login;