import React from 'react';
import {Outlet} from "react-router-dom";
import {CommonStyled} from "../components/styled/common-styled";

const CommonLayout = () => {

  return (
    <CommonStyled>
      <Outlet />
    </CommonStyled>
  );
};

export default CommonLayout;