import * as SideBar from './sidebar';
import * as Theme from './theme';
import * as MyBlog from './myblog';
import * as MySubscribes from './subscribe';

export type AppState = {
  isSideBar: SideBar.State
  themeType: Theme.State
  myBlog: MyBlog.State
  mySubscribes: MySubscribes.State
}
