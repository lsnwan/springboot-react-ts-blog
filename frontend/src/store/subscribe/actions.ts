import type * as T from './types';

export const setSubscribes = (payload: T.State): T.SetMySubscribes => ({
  type: '@mySubscribes/setMySubscribes',
  payload
});

export const addMySubscribes = (payload: T.MySubscribeState): T.AddMySubscribe => ({
  type: '@addMySubscribe/setAddMySubscribe',
  payload
})

export const removeMySubscribes = (payload: string): T.RemoveMySubscribe => ({
  type: '@removeMySubscribe/setRemoveMySubscribe',
  payload
})