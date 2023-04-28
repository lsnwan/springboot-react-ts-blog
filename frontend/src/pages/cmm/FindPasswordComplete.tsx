import React, {useEffect} from 'react';
import {ButtonPrimary, CommonBody, CommonCardSection, Title,} from "../../components/styled/common-styled";
import {Helmet} from "react-helmet";
import {useSelector} from "react-redux";
import {AppState} from "../../store";
import * as T from "../../store/theme";
import {useLocation, useNavigate} from "react-router-dom";

type LocationType = {
  email: string;
}

const FindPasswordComplete = () => {
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
        <title>YouBlog - 비밀번호 찾기 완료</title>
      </Helmet>

      <CommonCardSection theme={theme}>
        <Title className="mb-5">임시 비밀번호 발급 완료</Title>
        <div style={{textAlign: "center"}}>
          <h5>임시 비밀번호 발급이 완료되었습니다.</h5>
          <p style={{fontSize: "0.8em"}}>입력하신 <strong>{email}</strong> 메일로 임시 비밀번호를 발송 하였습니다.</p>
          <p style={{fontSize: "0.8em"}}>메일을 확인 후 변경된 비밀번호로 로그인하여 비밀번호를 변경해 주세요</p>
        </div>

        <div>
          <ButtonPrimary className="block mt-3" onClick={() => navigate('/login')}>로그인 페이지로</ButtonPrimary>
        </div>
      </CommonCardSection>
    </CommonBody>
  );
};

export default FindPasswordComplete;