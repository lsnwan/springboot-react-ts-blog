import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as icon from "@fortawesome/free-solid-svg-icons";
import * as headerStyle from "../styled/header-styled";
import {useDispatch, useSelector} from "react-redux";
import type {AppState} from "../../store";
import * as S from '../../store/sidebar';

const ToggleMenu = () => {

  const dispatch = useDispatch();
  const isSideBar = useSelector<AppState, S.State>(state => state.isSideBar);

  const toggleSideBar = () => {
    dispatch({type: '@isSideBar/setIsSideBar', payload: !isSideBar})
  }

  return (
    <headerStyle.MenuIcon>
      <FontAwesomeIcon icon={icon.faBars} onClick={toggleSideBar} />
    </headerStyle.MenuIcon>
  );
};

export default ToggleMenu;