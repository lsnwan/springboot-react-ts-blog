import React, {useCallback, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as icon from "@fortawesome/free-solid-svg-icons";
import * as SH from "../styled/header-styled";
import {useNavigate} from "react-router";
import * as Utils from "../../utils";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../store";
import * as T from "../../store/theme";

type PropsType = {
  theme: string | undefined;
}

const Header = (props: PropsType) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const themeType = useSelector<AppState, T.State>(state => state.themeType);

  const goLoginHandler = useCallback(() => {
    navigate('/login');
  }, [navigate])

  const changeThemeHandler = () => {

    if (themeType === undefined || themeType === 'dark') {
      Utils.setCookie('theme', 'light');
    } else {
      Utils.setCookie('theme', 'dark');
    }

    dispatch({type: '@theme/setTheme', payload: Utils.getCookie('theme')});
  }

  return (
    <SH.HeaderBox theme={props.theme}>
      <SH.BrandBox>
        <SH.Logo theme={props.theme} onClick={() => navigate('/')}>YouBlog</SH.Logo>
      </SH.BrandBox>


      <SH.ProfileBox>

        <SH.ThemeButton onClick={changeThemeHandler}>
          {themeType === 'light' && (
            <FontAwesomeIcon icon={icon.faMoon} />
          )}
          {themeType === 'dark' && (
            <FontAwesomeIcon icon={icon.faSun} />
          )}
        </SH.ThemeButton>

      </SH.ProfileBox>
    </SH.HeaderBox>
  );

};

export default Header;