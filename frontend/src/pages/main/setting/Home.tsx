import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import {Container, ContentBody, UserProfile} from "../../../components/styled/content-styled";
import Loading from "../../../components/cmm/Loading";
import {useLocation} from "react-router-dom";
import {Helmet} from "react-helmet";
import {ProfileBox} from "../../../components/styled/header-styled";
import {
  ButtonDanger,
  ButtonPrimary,
  InputText,
  InputTextBlock,
  MessageBox
} from "../../../components/styled/common-styled";
import {useSelector} from "react-redux";
import {AppState} from "../../../store";
import * as T from "../../../store/theme";
import axios from "axios";
import {Path} from "@remix-run/router/history";
import {useNavigate} from "react-router";
import * as MB from "../../../store/myblog";
import {useAuth} from "../../../contexts";

type UserInfoType = {
  id: string;
  profilePath: string | undefined;
  nickname: string;
}

const SettingHome = () => {

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const location = useLocation();
  const theme = useSelector<AppState, T.State>(state => state.themeType);
  const [userInfo, setUserInfo] = useState<UserInfoType>({
    id: '',
    profilePath: undefined,
    nickname: ''
  });
  const navigate = useNavigate();
  const [nicknameMessage, setNicknameMessage] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(document.createElement('input'));
  const {updateProfile} = useAuth();

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
    setNicknameMessage('');
    setUserInfo(prevState => ({
      ...prevState,
      nickname: e.target.value
    }));
  }

  const handleSubmitNickname = () => {
    axios.post('/api/settings/nickname', {
      nickname: userInfo.nickname
    })
      .then(res => res.data)
      .then((result: { code: string; message: string; data?: any; path: string | Partial<Path>; }) => {
        console.log(result);

        if (result.code === 'Q-001') {
          setNicknameMessage(result.data.nickname);
        }

        alert(result.message);

      });
  }

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const file = fileInputRef.current?.files?.[0];
    if (file) {
      const fileExt = file.type.substring(file.type.indexOf("/") + 1, file.type.length);
      const permitExt = ['png', 'jpg', 'jpeg'];
      if (!permitExt.includes(fileExt)) {
        alert('이미지 파일(jpg, jpeg, png)만 업로드 하세요');
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setUserInfo(prevState => ({
          ...userInfo,
          profilePath: reader.result as string
        }));
      };
    }
  }

  const handleSubmitProfileImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const formData = new FormData();
    const file = fileInputRef.current?.files?.[0];
    if (file) {
      formData.append("file", file);
      axios.post(`/api/settings/profile-image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      })
        .then(res => res.data)
        .then((result: {code: string; message: string; data?: any; path: string | Partial<Path>;}) => {
          alert(result.message);
          if (result.code === '201') {
            updateProfile(result.data);
          }
        });
      return;
    }

    alert('파일을 선택해 주세요');
  }

  const handleDeleteProfileImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    axios.delete(`/api/settings/profile-image`)
      .then(res => res.data)
      .then((result: { code: string; message: string; data?: any; path: string | Partial<Path>; }) => {
        alert(result.message);
        if (result.code === '200') {
          updateProfile(null);
          fileInputRef.current.value = "";
          setUserInfo(prevState => ({
            ...userInfo,
            profilePath: undefined
          }));
        }
      });
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
                <input type="file" accept="image/*" ref={fileInputRef} onChange={handleProfileImageChange} />
                <p className="text-secondary small mb-0">파일은 10MB 이하, 확장자는 jpg, png파일만 가능합니다.</p>
              </div>
            </div>
            <div className="text-end">
              <ButtonDanger type="button" className="small" onClick={handleDeleteProfileImage}>초기화</ButtonDanger>
              <ButtonPrimary type="button" className="small ms-2" onClick={handleSubmitProfileImage}>저장하기</ButtonPrimary>
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
              {nicknameMessage && (
                <MessageBox className="error">{nicknameMessage}</MessageBox>
              )}
            </div>
            <div className="text-end mt-2">
              <ButtonPrimary type="submit" className="small ms-2" onClick={handleSubmitNickname}>저장하기</ButtonPrimary>
            </div>
          </div>
        </div>

      </Container>

    </ContentBody>
  );
};

export default SettingHome;