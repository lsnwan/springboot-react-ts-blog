import React, {ChangeEvent, useEffect, useState} from 'react';
import {Container, ContentBody, UserProfile} from "../../../components/styled/content-styled";
import Loading from "../../../components/cmm/Loading";
import {useLocation} from "react-router-dom";
import {Helmet} from "react-helmet";
import {ProfileBox} from "../../../components/styled/header-styled";
import {ButtonDanger, ButtonPrimary, InputText, InputTextBlock} from "../../../components/styled/common-styled";
import {useSelector} from "react-redux";
import {AppState} from "../../../store";
import * as T from "../../../store/theme";
import axios from "axios";
import {Path} from "@remix-run/router/history";
import {useNavigate} from "react-router";

type UserInfoType = {
  id: string;
  profilePath: string;
  nickname: string;
}

const SettingHome = () => {

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const location = useLocation();
  const theme = useSelector<AppState, T.State>(state => state.themeType);
  const [userInfo, setUserInfo] = useState<UserInfoType>({
    id: '',
    profilePath: '',
    nickname: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/settings')
      .then(res => res.data)
      .then((result: {code: string; message: string; data?: any; path: string | Partial<Path>;}) => {
        console.log(result);

        if (result.code === 'A-001') {
          navigate('/login');
        }

        if (result.code === '200') {
          setUserInfo(result.data);
          setIsLoading(false);
        }
      })
  }, [location]);

  const handleChangeNickname = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInfo(prevState => ({
      ...prevState,
      nickname: e.target.value
    }));
  }

  return (
    <ContentBody>
      {isLoading && (
        <Loading />
      )}

      <Helmet>
        <title>YouBlog - 설정</title>
      </Helmet>

      <Container>
        <h3>설정</h3>

        {/*프로필 이미지 수정 박스*/}
        <div className="d-flex justify-content-start mb-3 mt-4 bg-light p-3" style={{borderRadius: "15px"}}>
          <div style={{width: "300px"}}>
            <h6 className="fw-bold">프로필</h6>
          </div>
          <div className="flex-fill">
            <div className="d-flex justify-content-start">
              <UserProfile imageWidth="75px" imageHeight="75px" imagePath={userInfo.profilePath != null ? userInfo.profilePath : '/images/no-profile.png'}></UserProfile>
              <div className="ms-2">
                <input type="file"></input>
                <p className="text-secondary small mb-0">파일은 10MB 이하, 확장자는 jpg, png파일만 가능합니다.</p>
              </div>
            </div>
            <div className="text-end">
              <ButtonDanger type="button" className="small">초기화</ButtonDanger>
              <ButtonPrimary type="submit" className="small ms-2">저장하기</ButtonPrimary>
            </div>
          </div>
        </div>

        {/*닉네임 수정 박스*/}
        <div className="d-flex justify-content-start mb-3 bg-light p-3" style={{borderRadius: "15px"}}>
          <div style={{width: "300px"}}>
            <h6 className="fw-bold">닉네임</h6>
          </div>
          <div className="flex-fill">
            <div className="ms-2">
              <InputTextBlock type="text" theme={theme} value={userInfo?.nickname} onChange={handleChangeNickname} />
            </div>
            <div className="text-end mt-2">
              <ButtonPrimary type="submit" className="small ms-2">저장하기</ButtonPrimary>
            </div>
          </div>
        </div>

      </Container>

    </ContentBody>
  );
};

export default SettingHome;