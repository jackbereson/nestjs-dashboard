
import { Setting } from "../../lib/modules/setting/setting.model";
import { SettingConstants, SettingEvent } from "../actions/setting.action";
import { ApiStatus } from "../redux.helper";

export interface SettingStore {
  status: ApiStatus;
  settings: Setting[];
}

const init: SettingStore = {
  status: ApiStatus.INIT,
  settings: null,
};

export const settingReducer = (state: SettingStore = init, event: SettingEvent) => {
  switch (event.type) {
    case SettingConstants.GET_SETTINGS:
      // console.log("GET_SETTINGS");
      return {
        ...state,
        status: ApiStatus.LOADING,
      };
    case SettingConstants.GET_SETTINGS_LOADED:
      // console.log("GET_SETTINGS_LOADED");
      return {
        ...state,
        status: ApiStatus.LOADED,
        settings: event.data,
      };
    default:
      return state;
  }
};


