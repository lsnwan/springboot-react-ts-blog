import React, {useEffect} from 'react';
import {ButtonPrimary, CommonBody, Title,} from "../../components/styled/common-styled";
import {Helmet} from "react-helmet";
import {useSelector} from "react-redux";
import {AppState} from "../../store";
import * as T from "../../store/theme";
import {useLocation, useNavigate} from "react-router-dom";

type LocationType = {
  email: string;
}

const SignUpComplete = () => {
  const theme = useSelector<AppState, T.State>(state => state.themeType);
  const navigate = useNavigate();
  const location = useLocation();
  const {email} = location.state || {email: ''};

  useEffect(() => {
    if (email === '') {
      navigate(-1);
    }
  }, [])

  return (
    <CommonBody theme={theme}>
      <Helmet>
        <title>YouBlog - 회원가입 완료</title>
      </Helmet>

      <Title className="mb-5">회원가입 완료</Title>
      <div style={{textAlign: "center"}}>
        <h5>회원가입이 완료 되었습니다.</h5>
        <p>가입하신 <strong>{email}</strong> 메일로 인증 메일을 발송 하였습니다.</p>
        <p>메일을 확인 후 인증을 완료해 주세요</p>
      </div>

      <div>
        <ButtonPrimary className="block mt-3" onClick={() => navigate('/login')}>로그인 페이지로</ButtonPrimary>
      </div>


    </CommonBody>
  );
};

export default SignUpComplete;