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

export type MyBlogIntro = string;

export type MyBlogBannerImagePath = string | null;

export type MyBlogEnabled = boolean;
export type MySubscribed = boolean;