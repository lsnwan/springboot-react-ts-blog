import React, {useEffect, useState} from 'react';
import {Container, ContentBody, UserProfile} from "../../../components/styled/content-styled";
import Loading from "../../../components/cmm/Loading";
import {useLocation} from "react-router-dom";
import {Helmet} from "react-helmet";
import {ProfileBox} from "../../../components/styled/header-styled";
import {ButtonDanger, ButtonPrimary, InputText, InputTextBlock} from "../../../components/styled/common-styled";
import {useSelector} from "react-redux";
import {AppState} from "../../../store";
import * as T from "../../../store/theme";

const SettingHome = () => {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const location = useLocation();
  const theme = useSelector<AppState, T.State>(state => state.themeType);


  useEffect(() => {

  }, [location]);

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
              <UserProfile width="75px" height="75px"></UserProfile>
              <div className="ms-2">
                <input type="file"></input>
                <p className="text-secondary small mb-0">파일은 10MB 이하, 확장자는 jpg, png파일만 가능합니다.</p>
                <p className="text-secondary small">최적 해상도는 너비 1080px, 높이 400px 입니다.</p>
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
              <InputTextBlock type="text" theme={theme} />
              <p className="text-secondary small mb-0">파일은 10MB 이하, 확장자는 jpg, png파일만 가능합니다.</p>
              <p className="text-secondary small">최적 해상도는 너비 1080px, 높이 400px 입니다.</p>
            </div>
            <div className="text-end">
              <ButtonPrimary type="submit" className="small ms-2">저장하기</ButtonPrimary>
            </div>
          </div>
        </div>

      </Container>

    </ContentBody>
  );
};

export default SettingHome;