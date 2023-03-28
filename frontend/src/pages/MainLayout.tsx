import React, {useState} from 'react';
import Header from "../components/header/Header";
import {BodyBox} from "../components/styled/content-styled";
import SideBar from "../components/sidebar/SideBar";
import {Outlet} from "react-router-dom";
import {BrowserView, MobileOnlyView, TabletView} from 'react-device-detect';
import * as Utils from '../utils';
import {useSelector} from "react-redux";
import {AppState} from "../store";
import * as T from "../store/theme";

const MainLayout = () => {

  const theme = useSelector<AppState, T.State>(state => state.themeType);

  return (
    <>
      <BrowserView>
        <Header theme={theme}/>
        <BodyBox theme={theme}>
          <SideBar theme={theme}></SideBar>
          <Outlet />
        </BodyBox>
      </BrowserView>

      <TabletView>
        <Header theme={theme}/>
        <BodyBox theme={theme}>
          <SideBar theme={theme}></SideBar>
          <Outlet />
        </BodyBox>
      </TabletView>

      <MobileOnlyView>
        <div style={{position: "fixed", top: "0", left: 0, zIndex: 1, width: '100%', height: '50px', backgroundColor: 'darkgray' }}>모바일 메인 레이아웃</div>
        <Outlet />
        <div style={{position: "fixed", bottom: "0", left: 0, zIndex: 1, width: '100%', height: '50px', backgroundColor: 'darkgray' }}>하단 메뉴</div>
      </MobileOnlyView>
    </>
  );
};

export default MainLayout;