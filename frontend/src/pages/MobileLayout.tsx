import React from 'react';
import {Outlet} from "react-router-dom";

const MobileLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default MobileLayout;