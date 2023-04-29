import * as string_decoder from "string_decoder";

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
}

export type MyBlogIntro = string;