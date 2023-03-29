import React from 'react';
import {Outlet} from "react-router-dom";
import {CommonStyled} from "../components/styled/common-styled";
import Header from "../components/cmm/Header";
import {useSelector} from "react-redux";
import {AppState} from "../store";
import * as T from "../store/theme";

const CommonLayout = () => {

  const theme = useSelector<AppState, T.State>(state => state.themeType);

  return (
    <CommonStyled>
      <Header theme={theme}/>
      <Outlet />
    </CommonStyled>
  );
};

export default CommonLayout;