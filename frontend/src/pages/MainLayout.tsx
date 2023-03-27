import React, {useState} from 'react';
import Header from "../components/header/Header";
import {BodyBox} from "../components/styled/content-box";
import SideBar from "../components/sidebar/SideBar";
import {Outlet} from "react-router-dom";

const MainLayout = () => {

  const [theme, setTheme] = useState<string>('dark');

  return (
    <>
      <Header theme={theme}/>
      <BodyBox>
        <SideBar></SideBar>
        <Outlet />
      </BodyBox>
    </>
  );
};

export default MainLayout;