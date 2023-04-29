import * as T from './types';

const initialState: T.State = {
  accountId: '',
  accountName: '',
  accountProfilePath: '',
  blogBannerImagePath: '',
  blogInfoIdx: 0,
  blogIntro: '',
  blogOwner: false,
  blogPath: '',
  blogTitle: '',
  enabled: false,
  registeredDate: '',
  totalContentCount: 0,
  totalSubscribeCount: 0
}

export const reducer = (state: T.State = initialState, action: T.Actions) => {
  switch (action.type) {
    case "@myBlogInfo/setMyBlogInfo":
      return action.payload;

    case '@UpdateBlogIntro/setUpdateBlogIntro':
      return {...state, blogIntro: action.payload}
  }
  return state
}
