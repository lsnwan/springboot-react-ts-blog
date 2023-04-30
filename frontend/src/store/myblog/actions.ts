import type * as T from './types';
import {MyBlogBannerImagePath, MyBlogIntro} from "../CommonTypes";

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
