import React from 'react';
import {SidebarBox} from "../styled/sidebar-styled";
import {useSelector} from "react-redux";
import {AppState} from "../../store";
import * as S from "../../store/sidebar";


const SideBar = () => {

  const isSideBar = useSelector<AppState, S.State>(state => state.isSideBar);

  return (
    <SidebarBox className={isSideBar ? "" : "close"}>
      사이드 메뉴
    </SidebarBox>
  );
};

export default SideBar;