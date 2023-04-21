import React, {useCallback, useEffect, useRef, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as icon from "@fortawesome/free-solid-svg-icons";
import * as SH from "../styled/header-styled";
import * as SC from "../styled/common-styled";
import ToggleMenu from "./ToggleMenu";
import {useNavigate} from "react-router";
import * as Utils from "../../utils";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../store";
import * as T from "../../store/theme";
import {BsBrightnessHighFill, BsFillMoonFill} from "react-icons/all";
import {useAuth} from "../../contexts";

type PropsType = {
  theme: string | undefined;
}

const Header = (props: PropsType) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const themeType = useSelector<AppState, T.State>(state => state.themeType);
  const [profileMenuOpen, setProfileMenuOpen] = useState<boolean>();
  const dropboxRef = useRef<HTMLDivElement>(null);
  const theme = useSelector<AppState, T.State>(state => state.themeType);
  const goLoginHandler = useCallback(() => {
    navigate('/login');
  }, [navigate])
  const {logout, loggedUser} = useAuth();

  const changeThemeHandler = () => {

    if (themeType === undefined || themeType === 'dark') {
      Utils.setCookie('theme', 'light');
    } else {
      Utils.setCookie('theme', 'dark');
    }

    dispatch({type: '@theme/setTheme', payload: Utils.getCookie('theme')});
  }

  const handleOpen = () => {
    setProfileMenuOpen(!profileMenuOpen);
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropboxRef.current && !dropboxRef.current.contains(e.target as Node)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropboxRef]);

  const handleLogout = () => {
    logout(() => {
      navigate("/");
    });
  }

  return (
    <SH.HeaderBox theme={props.theme}>
      <SH.BrandBox>
        <ToggleMenu theme={props.theme}/>
        <SH.Logo theme={props.theme} onClick={() => navigate('/')}>YouBlog</SH.Logo>
      </SH.BrandBox>

      <SH.SearchBox>
        <SH.SearchInputBox theme={props.theme}>
          <SH.SearchInput theme={props.theme}/>
        </SH.SearchInputBox>
        <SH.SearchButtonBox theme={props.theme}>
          <FontAwesomeIcon icon={icon.faSearch}/>
        </SH.SearchButtonBox>
      </SH.SearchBox>

      <SH.ProfileBox>

        <SH.ThemeButton onClick={changeThemeHandler}>
          {themeType === 'light' && (
            <BsFillMoonFill/>
          )}
          {themeType === 'dark' && (
            <BsBrightnessHighFill/>
          )}
        </SH.ThemeButton>

        {/*익명 사용자*/}
        {!localStorage.getItem("userId") && (
          <SH.headerButton onClick={goLoginHandler}>시작하기</SH.headerButton>
        )}

        {/*인증된 사용자*/}
        {localStorage.getItem("userId") && (
          <SH.ProfileButton onClick={handleOpen} ref={dropboxRef} profilePath={loggedUser?.profilePath}>
            <SH.ProfileDropBoxBody theme={theme} className={profileMenuOpen ? "active" : ""} >
              <SH.ProfileDropBoxList theme={theme}>내 블로그</SH.ProfileDropBoxList>
              <SH.ProfileDropBoxList theme={theme}>설정</SH.ProfileDropBoxList>
              <SC.Divider></SC.Divider>
              <SH.ProfileDropBoxList theme={theme} onClick={handleLogout}>로그아웃</SH.ProfileDropBoxList>
            </SH.ProfileDropBoxBody>
          </SH.ProfileButton>
        )}


      </SH.ProfileBox>
    </SH.HeaderBox>
  );

};

export default Header;