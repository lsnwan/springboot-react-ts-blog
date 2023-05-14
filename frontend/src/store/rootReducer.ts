import {combineReducers} from "redux";
import * as SideBar from './sidebar';
import * as ThemeType from './theme';
import * as MyBlog from './myblog';
import * as MySubscribes from './subscribe';

export const rootReducer = combineReducers({
  isSideBar: SideBar.reducer,
  themeType: ThemeType.reducer,
  myBlog: MyBlog.reducer,
  mySubscribes: MySubscribes.reducer,
});
