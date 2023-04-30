import React, {useEffect} from 'react';
import {useAuth} from "../../contexts";
import {useNavigate} from "react-router";

type Props = {};

const KakaoLogin = (props: Props) => {

  const {socialLogin} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code") || '';

    socialLogin(code, 'kakao', (message) => {
      if (message === undefined) {
        navigate('/');
      } else {
        alert(message);
        navigate('/login');
      }
    })

  }, [])

  return (
    <></>
  );
};

export default KakaoLogin;