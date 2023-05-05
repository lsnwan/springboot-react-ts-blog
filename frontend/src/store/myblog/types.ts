import {Action} from "redux";
import {MyBlogBannerImagePath, MyBlogEnabled, MyBlogInfoState, MyBlogIntro} from "../CommonTypes";

export type State = MyBlogInfoState


export type SetMyBlogInfo = Action<'@myBlogInfo/setMyBlogInfo'> & {
  payload: State
}

export type UpdateBlogIntro = Action<'@UpdateBlogIntro/setUpdateBlogIntro'> & {
  payload: MyBlogIntro
}

export type UpdateBlogBanner = Action<'@UpdateBlogBanner/setUpdateBlogBanner'> & {
  payload: MyBlogBannerImagePath
}

export type UpdateBlogEnabled = Action<'@UpdateBlogEnabled/setUpdateBlogEnabled'> & {
  payload: MyBlogEnabled
}



export type Actions =
    SetMyBlogInfo
  | UpdateBlogIntro
  | UpdateBlogBanner
  | UpdateBlogEnabled;
