import * as SideBar from './sidebar';
import * as Theme from './theme';
import * as MyBlog from './myblog';

export type AppState = {
  isSideBar: SideBar.State
  themeType: Theme.State
  myBlog: MyBlog.State
}
