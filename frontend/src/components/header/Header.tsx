import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as icon from "@fortawesome/free-solid-svg-icons";
import * as SH from "../styled/header-styled";
import ToggleMenu from "./ToggleMenu";

type HeaderPropsType = {
  theme: string;
}

const Header = (props :HeaderPropsType) => {

  return (
    <SH.HeaderBox theme={props.theme}>
      <SH.BrandBox>
        <ToggleMenu />
        <SH.Logo>YouBlog</SH.Logo>
      </SH.BrandBox>

      <SH.SearchBox>
        <SH.SearchInputBox theme={props.theme}>
          <SH.SearchInput/>
        </SH.SearchInputBox>
        <SH.SearchButtonBox theme={props.theme}>
          <FontAwesomeIcon icon={icon.faSearch} />
        </SH.SearchButtonBox>
      </SH.SearchBox>

      <SH.ProfileBox>

        <SH.ThemeButton>
          <FontAwesomeIcon icon={icon.faSun} />
        </SH.ThemeButton>

        {/*익명 사용자*/}
        {/*<styled.headerButton>시작하기</styled.headerButton>*/}

        {/*인증된 사용자*/}
        <SH.ProfileButton></SH.ProfileButton>
      </SH.ProfileBox>
    </SH.HeaderBox>
  );

};

export default Header;