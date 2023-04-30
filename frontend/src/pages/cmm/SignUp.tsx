import React, {useState} from 'react';
import {
  ButtonPrimary,
  CommonBody,
  CommonCardSection,
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
import {useNavigate} from "react-router";
import {Path} from "@remix-run/router/history";

type SignUpFormType = {
  email: string;
  password: string;
  passwordConfirm: string;

}

const SignUp = () => {

  const navigate = useNavigate();
  const theme = useSelector<AppState, T.State>(state => state.themeType);
  const [signUpForm, setSignUpForm] = useState<SignUpFormType>({
    email: '',
    password: '',
    passwordConfirm: ''
  });

  const [signUpFormError, setSignUpFormError] = useState<SignUpFormType>({
    email: '',
    password: '',
    passwordConfirm: ''
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 초기화
    setSignUpFormError({
      email: '',
      password: '',
      passwordConfirm: ''
    });

    // 요청
    axios.post('/api/auth/sign-up', signUpForm)
      .then(res => res.data)
      .then((result: {code: string; message: string; data?: any; path: string | Partial<Path>;}) => {
        if (result.code === 'Q-001') {
          setSignUpFormError({
            email: result.data.email === undefined ? '' : result.data.email,
            password: result.data.password === undefined ? '' : result.data.password,
            passwordConfirm: result.data.passwordConfirm ? '' : result.data.passwordConfirm
          });
          return;
        }

        if (result.code === 'Q-002') {
          setSignUpFormError({
            email: '',
            password: '',
            passwordConfirm: result.message
          });
          return;
        }

        if (result.code === '201') {
          navigate(result.path, {state: {email: signUpForm.email}});
        }
      });
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setSignUpForm(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <CommonBody theme={theme}>
      <Helmet>
        <title>YouBlog - 회원가입</title>
      </Helmet>

      <CommonCardSection theme={theme}>
        <Title className="mb-5">회원가입</Title>

        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <InputLabelBlock htmlFor="email">이메일</InputLabelBlock>
            <InputTextBlock theme={theme} type="text" id="email" name="email" onChange={handleChange} />
            {signUpFormError.email && (
              <MessageBox className="error">{signUpFormError.email}</MessageBox>
            )}
          </div>

          <div  className="mb-2">
            <InputLabelBlock htmlFor="password">비밀번호</InputLabelBlock>
            <InputTextBlock theme={theme} type="password" id="password" name="password" onChange={handleChange} />
            {signUpFormError.password && (
              <MessageBox className="error">{signUpFormError.password}</MessageBox>
            )}
          </div>

          <div  className="mb-2">
            <InputLabelBlock htmlFor="passwordConfirm">비밀번호 확인</InputLabelBlock>
            <InputTextBlock theme={theme} type="password" id="passwordConfirm" name="passwordConfirm" onChange={handleChange} />
            {signUpFormError.passwordConfirm && (
              <MessageBox className="error">{signUpFormError.passwordConfirm}</MessageBox>
            )}
          </div>

          <div className="mt-3">
            <ButtonPrimary className="block" type="submit">회원가입</ButtonPrimary>
          </div>
        </form>

        <FlexBetween className="mt-3">
          <MessageBox className="desc m-0">이미 회원이신가요?</MessageBox>
          <Link style={{fontSize: "13px"}} to="/login">로그인</Link>
        </FlexBetween>

        <FlexBetween className="mt-1">
          <MessageBox className="desc m-0">비밀번호를 잊어버렸나요?</MessageBox>
          <Link style={{fontSize: "13px"}} to="/find-password">비밀번호 찾기</Link>
        </FlexBetween>
      </CommonCardSection>
    </CommonBody>
  );
};

export default SignUp;