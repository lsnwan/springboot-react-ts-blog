import React, {useState} from 'react';
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
import axios from "axios";
import {Path} from "@remix-run/router/history";
import {useNavigate} from "react-router";

type FindPasswordType = {
  email: string;
}

const FindPassword = () => {

  const theme = useSelector<AppState, T.State>(state => state.themeType);
  const navigate = useNavigate();
  const [findPasswordForm, setFindPasswordForm] = useState<FindPasswordType>({
    email: '',
  })

  const [findPasswordError, setFindPasswordError] = useState<FindPasswordType>({
    email: '',
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFindPasswordError({
      email: '',
    });

    axios.post('/api/auth/find-password', findPasswordForm)
      .then(res => res.data)
      .then((result: {code: string; message: string; data?:any; path: string | Partial<Path>;}) => {
        console.log(result);
        if (result.code === 'Q-001') {
          setFindPasswordError({
            email: result.data.email === undefined ? '' : result.data.email,
          });
          return;
        }

        if (result.code === '200') {
          navigate(result.path, {state: {email: findPasswordForm.email}});
          return;
        }

        alert(result.message);

      });

  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFindPasswordForm(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <CommonBody theme={theme}>
      <Helmet>
        <title>YouBlog - 비밀번호 찾기</title>
      </Helmet>

      <Title className="mb-5">비밀번호 찾기</Title>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <InputLabelBlock htmlFor="email">이메일</InputLabelBlock>
          <InputTextBlock type="text" id="email" name="email" onChange={handleChange}/>
          {findPasswordError.email && (
            <MessageBox className="error">{findPasswordError.email}</MessageBox>
          )}
        </div>

        <div className="mt-3">
          <ButtonPrimary className="block" type="submit">비밀번호 찾기</ButtonPrimary>
        </div>
      </form>

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