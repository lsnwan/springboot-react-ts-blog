import {Action} from "redux";

export type State = boolean

export type SetIsSideBarAction = Action<'@isSideBar/setIsSideBar'> & {
  payload: State
}

export type Actions = SetIsSideBarAction;
