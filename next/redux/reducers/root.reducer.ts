import { combineReducers } from "redux";
import { SettingEvent } from "../actions/setting.action";
import { SettingStore, settingReducer } from "./setting.reducer";
import { LoadingEvent } from "../actions/loading.action";
import { LoadingStore, loadingReducer } from "./loading.reducer";
import { UserEvent } from "../actions/user.action";
import { UserStore, userReducer } from "./user.reducer";
import { SettingGroupEvent } from "../actions/setting-group.action";
import { SettingGroupStore, settingGroupReducer } from "./setting-group.reducer";

export type Event = SettingEvent | LoadingEvent | UserEvent | SettingGroupEvent ;

export interface Store {
  settingReducer: SettingStore;
  settingGroupReducer: SettingGroupStore;
  loadingReducer: LoadingStore;
  userReducer: UserStore;
}

const rootReducer = combineReducers({
  settingReducer,
  settingGroupReducer,
  loadingReducer,
  userReducer,
});

export default rootReducer;
