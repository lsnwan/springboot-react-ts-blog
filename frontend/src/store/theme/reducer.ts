import * as T from './types';
import * as Utils from "../../utils";

if (Utils.getCookie('theme') === undefined || Utils.getCookie('theme') === null) {
  Utils.setCookie('theme', 'light');
}

const initialState: T.State = Utils.getCookie('theme');

export const reducer = (state: T.State = initialState, action: T.Actions) => {
  switch (action.type) {
    case "@theme/setTheme":
      return action.payload
  }
  return state
}
