export type MyBlogInfoState = {
  accountId: string;
  accountName: string;
  accountProfilePath: string;
  blogBannerImagePath: string;
  blogInfoIdx: number;
  blogIntro: string;
  blogOwner: boolean;
  blogPath: string;
  blogTitle: string;
  enabled: boolean;
  registeredDate: string;
  totalContentCount: number;
  totalSubscribeCount: number;
  subscribed: boolean;
}

export type MySubscribeBlogPath = {
  blogPath: string;
}

export type MySubscribeState = {
  blogPath: string;
  nickname: string;
  profilePath: string;
}



export type MyBlogIntro = string;

export type MyBlogBannerImagePath = string | null;

export type MyBlogEnabled = boolean;
export type MySubscribed = boolean;

