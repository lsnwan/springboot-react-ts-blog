import {combineReducers} from "redux";
import * as SideBar from './sidebar';
import * as ThemeType from './theme';

export const rootReducer = combineReducers({
  isSideBar: SideBar.reducer,
  themeType: ThemeType.reducer,
});
