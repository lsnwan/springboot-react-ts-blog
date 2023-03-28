import {Action} from "redux";

export type State = string | undefined

export type SetThemeAction = Action<'@theme/setTheme'> & {
  payload: State
}

export type Actions = SetThemeAction;
