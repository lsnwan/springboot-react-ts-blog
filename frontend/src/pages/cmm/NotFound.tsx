import React from 'react';
import {useSelector} from "react-redux";
import {AppState} from "../../store";
import * as T from "../../store/theme";

const NotFound = () => {

  const theme = useSelector<AppState, T.State>(state => state.themeType);

  return (
    <div>
      NotFound
    </div>
  );
};

export default NotFound;