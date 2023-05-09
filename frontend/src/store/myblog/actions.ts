import type * as T from './types';
import {MyBlogBannerImagePath, MyBlogEnabled, MyBlogIntro, MySubscribed} from "../CommonTypes";

export const setMyBlogInfo = (payload: T.State): T.SetMyBlogInfo => ({
  type: '@myBlogInfo/setMyBlogInfo',
  payload,
});

export const updateMyBlogIntro = (payload: MyBlogIntro): T.UpdateBlogIntro => ({
  type: '@UpdateBlogIntro/setUpdateBlogIntro',
  payload,
});

export const updateMyBlogBanner = (payload: MyBlogBannerImagePath): T.UpdateBlogBanner => ({
  type: '@UpdateBlogBanner/setUpdateBlogBanner',
  payload,
});

export const updateMyBlogEnabled = (payload: MyBlogEnabled): T.UpdateBlogEnabled => ({
  type: '@UpdateBlogEnabled/setUpdateBlogEnabled',
  payload,
});

export const updateMySubscribed = (payload: MySubscribed): T.UpdateSubscribed => ({
  type: '@UpdateSubscribed/setUpdateSubscribed',
  payload,
});
