import React, {useEffect, useState} from 'react';
import {BannerImagePreview, BlogContainer} from "../../../../components/styled/myblog-styled";
import {ButtonPrimary, FlexStart, InputLabelBlock, TextArea} from "../../../../components/styled/common-styled";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../../store";
import * as T from "../../../../store/theme";
import * as MB from "../../../../store/myblog";
import ToggleSwitch from "../../../../components/cmm/ToggleSwitch";
import axios from "axios";
import {useOutletContext, useParams} from "react-router";
import {Path} from "@remix-run/router/history";
import {composeWithDevTools} from "@reduxjs/toolkit/dist/devtoolsExtension";

type Props = {};

type UpdateIntroFormType = {
  intro: string
};

const Settings = (props: Props) => {
  const {blogPath} = useParams<string>();
  const dispatch = useDispatch();
  const theme = useSelector<AppState, T.State>(state => state.themeType);
  const blogInfo = useSelector<AppState, MB.State>(state => state.myBlog);
  const [introForm, setIntroForm] = useState<UpdateIntroFormType>({
    intro: ''
  });

  useEffect(() => {
    if (blogInfo.blogIntro !== null) {
      setIntroForm({
        intro: blogInfo.blogIntro,
      });
    }
  }, []);

  const handleChangeIntro = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    setIntroForm(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }
  const handleSubmitIntro = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.post(`/api/blogs/${blogPath}/intro`, introForm)
      .then(res => res.data)
      .then((result: {code: string; message: string; data?: any; path: string | Partial<Path>;}) => {
        console.log(result);
        alert(result.message);
        if (result.code === '200') {
          dispatch(MB.updateMyBlogIntro(introForm.intro));
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
            <BannerImagePreview image="">
              <span className="visually-hidden">배너 이미지</span>
            </BannerImagePreview>
            <div className="ms-2" style={{width: '100%'}}>
              <div>
                <input type="file" />
              </div>
              <div>
                <small className="text-secondary">파일은 10MB 이하, 확장자는 jpg, png파일만 가능합니다.</small>
              </div>
              <div className="text-end">
                <ButtonPrimary className="small">저장하기</ButtonPrimary>
              </div>
            </div>
          </FlexStart>
        </div>
      </div>

      <div style={{display: 'flex', marginTop: '8px', borderBottom: '1px solid #dadada', paddingBottom: '15px'}}>
        <div style={{width: '250px', padding: '10px 15px'}}>
          <h1 style={{fontSize: '18px', fontWeight: 'bold', marginTop: '10px'}}>블로그 공개</h1>
        </div>
        <div style={{flex: 1}}>
          <ToggleSwitch />
        </div>
      </div>

    </BlogContainer>
  );
};

export default Settings;