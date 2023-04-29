import {Action} from "redux";
import {MyBlogInfoState, MyBlogIntro} from "../CommonTypes";

export type State = MyBlogInfoState


export type SetMyBlogInfo = Action<'@myBlogInfo/setMyBlogInfo'> & {
  payload: State
}

export type UpdateBlogIntro = Action<'@UpdateBlogIntro/setUpdateBlogIntro'> & {
  payload: MyBlogIntro
}

export type Actions =
    SetMyBlogInfo
  | UpdateBlogIntro;
