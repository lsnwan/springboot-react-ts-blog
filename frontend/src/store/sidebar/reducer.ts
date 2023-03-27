import * as T from './types';
import * as deviceDetect from 'react-device-detect';

const initialState: T.State = deviceDetect.isBrowser

export const reducer = (state: T.State = initialState, action: T.Actions) => {
  switch (action.type) {
    case "@isSideBar/setIsSideBar":
      return action.payload
  }
  return state
}
