import React, {useCallback, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as icon from "@fortawesome/free-solid-svg-icons";
import * as SH from "../styled/header-styled";
import ToggleMenu from "./ToggleMenu";
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
    console.log('테마변경');

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
        <ToggleMenu />
        <SH.Logo>YouBlog</SH.Logo>
      </SH.BrandBox>

      <SH.SearchBox>
        <SH.SearchInputBox theme={props.theme}>
          <SH.SearchInput theme={props.theme}/>
        </SH.SearchInputBox>
        <SH.SearchButtonBox theme={props.theme}>
          <FontAwesomeIcon icon={icon.faSearch} />
        </SH.SearchButtonBox>
      </SH.SearchBox>

      <SH.ProfileBox>

        <SH.ThemeButton onClick={changeThemeHandler}>
          {themeType === 'light' && (
            <FontAwesomeIcon icon={icon.faMoon} />
          )}
          {themeType === 'dark' && (
            <FontAwesomeIcon icon={icon.faSun} />
          )}
        </SH.ThemeButton>

        {/*익명 사용자*/}
        <SH.headerButton onClick={goLoginHandler}>시작하기</SH.headerButton>

        {/*인증된 사용자*/}
        {/*<SH.ProfileButton></SH.ProfileButton>*/}
      </SH.ProfileBox>
    </SH.HeaderBox>
  );

};

export default Header;