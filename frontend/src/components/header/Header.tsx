import React, {useRef, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as icon from "@fortawesome/free-solid-svg-icons";
import * as styled from "../styled/header-styled";
import ToggleMenu from "./ToggleMenu";

type HeaderPropsType = {
  theme: string;
}

const Header = (props :HeaderPropsType) => {

  return (
    <styled.HeaderBox theme={props.theme}>
      <styled.BrandBox>
        <ToggleMenu />
        <styled.Logo>YouBlog</styled.Logo>
      </styled.BrandBox>

      <styled.SearchBox>
        <styled.SearchInputBox theme={props.theme}>
          <styled.SearchInput/>
        </styled.SearchInputBox>
        <styled.SearchButtonBox theme={props.theme}>
          <FontAwesomeIcon icon={icon.faSearch} />
        </styled.SearchButtonBox>
      </styled.SearchBox>

      <styled.ProfileBox>

        <styled.ThemeButton>
          <FontAwesomeIcon icon={icon.faSun} />
        </styled.ThemeButton>

        {/*익명 사용자*/}
        {/*<styled.headerButton>시작하기</styled.headerButton>*/}

        {/*인증된 사용자*/}
        <styled.ProfileButton></styled.ProfileButton>
      </styled.ProfileBox>
    </styled.HeaderBox>
  );

};

export default Header;