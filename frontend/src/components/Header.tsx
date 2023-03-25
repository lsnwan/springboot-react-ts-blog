import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as icon from "@fortawesome/free-solid-svg-icons";
import * as headerStyle from "./styled/header-styled";
import {MobileSearchButtonBox} from "./styled/header-styled";

type HeaderPropsType = {
  theme: string;
}

const Header = (props :HeaderPropsType) => {

  return (
    <headerStyle.HeaderBox theme={props.theme}>
      <headerStyle.BrandBox>
        <headerStyle.MenuIcon>
          <FontAwesomeIcon icon={icon.faBars} />
        </headerStyle.MenuIcon>
        <headerStyle.Logo></headerStyle.Logo>
      </headerStyle.BrandBox>

      <headerStyle.SearchBox>
        <headerStyle.SearchInputBox>
          <headerStyle.SearchInput/>
        </headerStyle.SearchInputBox>
        <headerStyle.SearchButtonBox>
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