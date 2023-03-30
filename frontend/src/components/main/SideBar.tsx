import React from 'react';
import {SidebarBox} from "../styled/sidebar-styled";
import {useSelector} from "react-redux";
import {AppState} from "../../store";
import * as S from "../../store/sidebar";
import SideMenu from "./SideMenu";

type PropsType = {
  theme: string | undefined;
}

const SideBar = (props: PropsType) => {

  const isSideBar = useSelector<AppState, S.State>(state => state.isSideBar);

  return (
    <SidebarBox theme={props.theme} className={isSideBar ? "" : "close"}>
      <SideMenu isSideBar={isSideBar} />
    </SidebarBox>
  );
};

export default SideBar;