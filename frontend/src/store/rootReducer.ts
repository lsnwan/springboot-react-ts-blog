import {combineReducers} from "redux";
import * as SideBar from './sidebar';

export const rootReducer = combineReducers({
  isSideBar: SideBar.reducer,
});
