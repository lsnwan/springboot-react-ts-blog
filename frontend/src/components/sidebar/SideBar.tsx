import React, {useEffect, useState} from 'react';
import {SidebarBox} from "../styled/sidebar-styled";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../store";
import * as S from "../../store/sidebar";


const SideBar = () => {

  const isSideBar = useSelector<AppState, S.State>(state => state.isSideBar);
  const dispatch = useDispatch();

  const handleResize = () => {
    let innerWidth = window.innerWidth;

    if (innerWidth < 430) {
      dispatch({type: "@isSideBar/setIsSideBar", payload: false});
      return;
    }

  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => { // cleanup
      window.removeEventListener('resize', handleResize);
    }
  }, [innerWidth, innerHeight]);

  return (
    <SidebarBox className={isSideBar ? "" : "close"}>
      사이드 메뉴
    </SidebarBox>
  );
};

export default SideBar;