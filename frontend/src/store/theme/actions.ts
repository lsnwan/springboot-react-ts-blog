import type * as T from './types';
export const setTheme = (payload: T.State): T.SetThemeAction => ({
  type: '@theme/setTheme',
  payload,
});
