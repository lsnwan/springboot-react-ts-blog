import React from 'react';
import {BlogContainer} from "../../../../components/styled/myblog-styled";
import {ButtonPrimary, InputLabelBlock, TextArea} from "../../../../components/styled/common-styled";
import {useSelector} from "react-redux";
import {AppState} from "../../../../store";
import * as T from "../../../../store/theme";
import ToggleSwitch from "../../../../components/cmm/ToggleSwitch";

type Props = {};

const Settings = (props: Props) => {
  const theme = useSelector<AppState, T.State>(state => state.themeType);

  return (
    <BlogContainer>
      <div style={{display: 'flex', marginTop: '8px', borderBottom: '1px solid gray', paddingBottom: '15px'}}>
        <div style={{width: '250px', padding: '10px 15px'}}>
          <h1 style={{fontSize: '18px', fontWeight: 'bold', marginTop: '10px'}}>소개</h1>
        </div>
        <div style={{flex: 1}}>
          <div>
            <InputLabelBlock htmlFor="blogTitle" className="visually-hidden">이메일</InputLabelBlock>
            <TextArea>

            </TextArea>
            <div style={{textAlign: 'right', marginTop: '10px'}}>
              <ButtonPrimary className="small">저장하기</ButtonPrimary>
            </div>
          </div>
        </div>
      </div>

      <div style={{display: 'flex', marginTop: '8px', borderBottom: '1px solid gray', paddingBottom: '15px'}}>
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