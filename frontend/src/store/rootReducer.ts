import {combineReducers} from "redux";
import * as SideBar from './sidebar';
import * as ThemeType from './theme';
import * as MyBlog from './myblog';

export const rootReducer = combineReducers({
  isSideBar: SideBar.reducer,
  themeType: ThemeType.reducer,
  myBlog: MyBlog.reducer,
});
