import type * as T from './types';
export const setIsSideBar = (payload: T.State): T.SetIsSideBarAction => ({
  type: '@isSideBar/setIsSideBar',
  payload,
});
