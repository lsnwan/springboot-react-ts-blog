import * as T from './types';
import * as Utils from "../../utils";

const initialState: T.State = Utils.getCookie('theme');

export const reducer = (state: T.State = initialState, action: T.Actions) => {
  switch (action.type) {
    case "@theme/setTheme":
      console.log('reducer', action.payload);
      return action.payload
  }
  return state
}
