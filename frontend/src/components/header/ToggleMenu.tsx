import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as icon from "@fortawesome/free-solid-svg-icons";
import * as headerStyle from "../styled/header-styled";

type Props = {
  onClick: () => void;
}


const ToggleMenu = (props :Props) => {

  return (
    <headerStyle.MenuIcon>
      <FontAwesomeIcon icon={icon.faBars} onClick={props.onClick} />
    </headerStyle.MenuIcon>
  );
};

export default ToggleMenu;