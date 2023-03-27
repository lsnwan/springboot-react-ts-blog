import * as T from './types';

const initialState: T.State = true

export const reducer = (state: T.State = initialState, action: T.Actions) => {
  switch (action.type) {
    case "@isSideBar/setIsSideBar":
      return action.payload
  }
  return state
}
