import * as T from './types'

const initialState: T.State = []

export const reducer = (state: T.State = initialState, action: T.Actions) => {

  switch (action.type) {
    case "@mySubscribes/setMySubscribes":
      return action.payload;

    case "@addMySubscribe/setAddMySubscribe":
      return [...state, action.payload]

    case "@removeMySubscribe/setRemoveMySubscribe":
      const findIndex = state.findIndex((item) => item.profilePath === action.payload);
      const newSubscribe = [...state];
      newSubscribe.splice(findIndex, 1);
      return newSubscribe;
  }

  return state
}
