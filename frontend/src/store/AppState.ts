import * as SideBar from './sidebar';
import * as Theme from './theme';

export type AppState = {
  isSideBar: SideBar.State
  themeType: Theme.State
}
