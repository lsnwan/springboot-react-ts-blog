import React, {useCallback} from 'react';
import * as SH from "../styled/header-styled";
import {useNavigate} from "react-router";
import * as Utils from "../../utils";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../store";
import * as T from "../../store/theme";
import {BsBrightnessHighFill, BsFillMoonFill} from "react-icons/all";

type PropsType = {
  theme: string | undefined;
}

const Header = (props: PropsType) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const themeType = useSelector<AppState, T.State>(state => state.themeType);

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
            <BsFillMoonFill/>
          )}
          {themeType === 'dark' && (
            <BsBrightnessHighFill/>
          )}
        </SH.ThemeButton>

      </SH.ProfileBox>
    </SH.HeaderBox>
  );

};

export default Header;