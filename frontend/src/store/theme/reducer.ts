import * as T from './types';
import * as Utils from "../../utils";

Utils.setCookie('theme', 'dark');

const initialState: T.State = Utils.getCookie('theme');

export const reducer = (state: T.State = initialState, action: T.Actions) => {
  switch (action.type) {
    case "@theme/setTheme":
      console.log('reducer', action.payload);
      return action.payload
  }
  return state
}
