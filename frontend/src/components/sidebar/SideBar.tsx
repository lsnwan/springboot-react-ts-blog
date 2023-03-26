import React, {useRef} from 'react';
import {SidebarBox} from "../styled/sidebar-styled";

type HeaderPropsType = {
  isSideOpen: boolean;
}

const SideBar = (props :HeaderPropsType) => {

  return (
    <SidebarBox className={props.isSideOpen ? '' : 'close'}>
      사이드 메뉴
    </SidebarBox>
  );
};

export default SideBar;