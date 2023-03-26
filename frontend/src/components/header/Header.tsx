import React, {useRef, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as icon from "@fortawesome/free-solid-svg-icons";
import * as headerStyle from "../styled/header-styled";
import ToggleMenu from "./ToggleMenu";

type HeaderPropsType = {
  theme: string;
  onClick: () => void;
}

const Header = (props :HeaderPropsType) => {

  return (
    <headerStyle.HeaderBox theme={props.theme}>
      <headerStyle.BrandBox>
        <ToggleMenu onClick={props.onClick} />
        <headerStyle.Logo></headerStyle.Logo>
      </headerStyle.BrandBox>

      <headerStyle.SearchBox>
        <headerStyle.SearchInputBox theme={props.theme}>
          <headerStyle.SearchInput/>
        </headerStyle.SearchInputBox>
        <headerStyle.SearchButtonBox theme={props.theme}>
          <FontAwesomeIcon icon={icon.faSearch} />
        </headerStyle.SearchButtonBox>
      </headerStyle.SearchBox>

      <headerStyle.ProfileBox>
        <headerStyle.MobileSearchButtonBox>
          <FontAwesomeIcon icon={icon.faSearch} />
        </headerStyle.MobileSearchButtonBox>
        {/*익명 사용자*/}
        {/*<headerStyle.LoginButton>시작하기</headerStyle.LoginButton>*/}

        {/*인증된 사용자*/}
        <headerStyle.NotificationButton>
          <FontAwesomeIcon icon={icon.faBell} />
        </headerStyle.NotificationButton>
        <headerStyle.ProfileButton></headerStyle.ProfileButton>
      </headerStyle.ProfileBox>
    </headerStyle.HeaderBox>
  );

};

export default Header;