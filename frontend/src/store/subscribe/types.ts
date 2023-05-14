import {Action} from "redux";
import {MySubscribeState} from "../CommonTypes";

export * from '../CommonTypes';

export type State = Array<MySubscribeState>;

export type SetMySubscribes = Action<'@mySubscribes/setMySubscribes'> & {
  payload: State
}

export type AddMySubscribe = Action<'@addMySubscribe/setAddMySubscribe'> & {
  payload: MySubscribeState
}

export type RemoveMySubscribe = Action<'@removeMySubscribe/setRemoveMySubscribe'> & {
  payload: string
}

export type Actions =
    SetMySubscribes
  | AddMySubscribe
  | RemoveMySubscribe;
