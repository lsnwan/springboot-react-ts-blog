import React, {useEffect, useRef, useState} from 'react';
import {BannerImagePreview, BlogContainer} from "../../../../components/styled/myblog-styled";
import {ButtonDanger, ButtonPrimary, FlexStart, TextArea} from "../../../../components/styled/common-styled";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../../store";
import * as T from "../../../../store/theme";
import * as MB from "../../../../store/myblog";
import ToggleSwitch from "../../../../components/cmm/ToggleSwitch";
import axios from "axios";
import {useParams} from "react-router";
import {Path} from "@remix-run/router/history";

type Props = {};

type UpdateIntroFormType = {
  intro: string
};

type ChangeBannerImageFormType = {
  bannerImagePath: string
};

const Settings = (props: Props) => {
  const {blogPath} = useParams<string>();
  const dispatch = useDispatch();
  const theme = useSelector<AppState, T.State>(state => state.themeType);
  const fileInputRef = useRef<HTMLInputElement>(document.createElement('input'));
  const [introForm, setIntroForm] = useState<UpdateIntroFormType>({
    intro: ''
  });
  const [enabled, setEnabled] = useState<boolean>(false);
  const [bannerImagePathForm, setBannerImagePathForm] = useState<ChangeBannerImageFormType>({
    bannerImagePath: ''
  })

  useEffect(() => {

    axios.get(`/api/blogs/${blogPath}/settings`)
      .then(res => res.data)
      .then((result: {code: string; message: string; data?: any; path: string | Partial<Path>;}) => {
        if (result.code === '200') {
          setIntroForm({
            intro: result.data.intro ?? '',
          });

          setEnabled(result.data.enabled ?? false);

          setBannerImagePathForm({
            bannerImagePath: result.data.bannerImagePath ?? '',
          });
        }
      });


  }, []);

  const handleChangeIntro = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    setIntroForm(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }
  /*
   * 소개 수정 버튼
   */
  const handleSubmitIntro = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.post(`/api/blogs/${blogPath}/settings/intro`, introForm)
      .then(res => res.data)
      .then((result: {code: string; message: string; data?: any; path: string | Partial<Path>;}) => {
        alert(result.message);
        if (result.code === '200') {
          dispatch(MB.updateMyBlogIntro(introForm.intro));
        }
      });
  }

  const handleChangeEnabled = () => {

    setEnabled(!enabled);

    axios.post(`/api/blogs/${blogPath}/settings/enabled`, {enabled: !enabled})
      .then(res => res.data)
      .then((result: { code: string; message: string; data?: any; path: string | Partial<Path>; }) => {
        alert(result.message);
      });
  }

  const handleBannerImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        setBannerImagePathForm({
          bannerImagePath: reader.result as string
        })
      };
    } else {
      setBannerImagePathForm({
        bannerImagePath: ''
      })
    }
  }

  const handleSubmitBanner = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    const file = fileInputRef.current?.files?.[0];
    if (file) {
      formData.append("file", file);
      axios.post(`/api/blogs/${blogPath}/settings/banner`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      })
        .then(res => res.data)
        .then((result: {code: string; message: string; data?: any; path: string | Partial<Path>;}) => {
          alert(result.message);
          if (result.code === '200') {
            dispatch(MB.updateMyBlogBanner(result.data.bannerImagePath));
          }
        });
      return;
    }
    
    alert('파일을 선택해 주세요');
  }

  const handleDeleteBannerImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    axios.delete(`/api/blogs/${blogPath}/settings/banner`)
      .then(res => res.data)
      .then((result: { code: string; message: string; data?: any; path: string | Partial<Path>; }) => {
        alert(result.message);
        if (result.code === '200') {
          dispatch(MB.updateMyBlogBanner(null));
          setBannerImagePathForm({
            bannerImagePath: ''
          });
          fileInputRef.current.value = "";
        }
      });
  }

  return (
    <BlogContainer>
      <div style={{display: 'flex', marginTop: '8px', borderBottom: '1px solid #dadada', paddingBottom: '15px'}}>
        <div style={{width: '250px', padding: '10px 15px'}}>
          <h1 style={{fontSize: '18px', fontWeight: 'bold', marginTop: '10px'}}>소개</h1>
        </div>
        <div style={{flex: 1}}>
          <div>
            <form onSubmit={handleSubmitIntro}>
              <TextArea theme={theme} id="blogIntro" name="intro" onChange={handleChangeIntro} value={introForm.intro} />
              <div style={{textAlign: 'right', marginTop: '10px'}}>
                <ButtonPrimary type="submit" className="small">저장하기</ButtonPrimary>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div style={{display: 'flex', alignItems: 'center', marginTop: '8px', borderBottom: '1px solid #dadada', paddingBottom: '15px'}}>
        <div style={{width: '250px', padding: '10px 15px'}}>
          <h1 style={{fontSize: '18px', fontWeight: 'bold', marginTop: '10px'}}>배너 이미지</h1>
        </div>
        <div style={{flex: 1}}>
          <FlexStart>
            <BannerImagePreview imagePath={bannerImagePathForm.bannerImagePath}>
              <span className="visually-hidden">배너 이미지</span>
            </BannerImagePreview>
            <div className="ms-2" style={{width: '100%'}}>
              <form onSubmit={handleSubmitBanner}>
                <div>
                  <input type="file" accept="image/*" ref={fileInputRef} onChange={handleBannerImageChange} />
                </div>
                <div>
                  <p className="text-secondary small mb-0">파일은 10MB 이하, 확장자는 jpg, png파일만 가능합니다.</p>
                  <p className="text-secondary small">최적 해상도는 너비 1080px, 높이 400px 입니다.</p>
                </div>
                <div className="text-end">
                  <ButtonDanger type="button" className="small" onClick={handleDeleteBannerImage}>초기화</ButtonDanger>
                  <ButtonPrimary type="submit" className="small ms-2">저장하기</ButtonPrimary>
                </div>
              </form>
            </div>
          </FlexStart>
        </div>
      </div>

      <div style={{display: 'flex', marginTop: '8px', borderBottom: '1px solid #dadada', paddingBottom: '15px'}}>
        <div style={{width: '250px', padding: '10px 15px'}}>
          <h1 style={{fontSize: '18px', fontWeight: 'bold', marginTop: '10px'}}>블로그 공개</h1>
        </div>
        <div style={{flex: 1}}>
          <ToggleSwitch enabled={enabled} changeEnabled={handleChangeEnabled} />
        </div>
      </div>

    </BlogContainer>
  );
};

export default Settings;