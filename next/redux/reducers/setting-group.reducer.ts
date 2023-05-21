

import { SettingGroup } from "../../lib/modules/setting-group/setting-group.model";
import { SettingGroupConstants, SettingGroupEvent } from "../actions/setting-group.action";
import { ApiStatus } from "../redux.helper";

export interface SettingGroupStore {
  status: ApiStatus;
  settingGroups: SettingGroup[];
}

const init: SettingGroupStore = {
  status: ApiStatus.INIT,
  settingGroups: null,
};

export const settingGroupReducer = (state: SettingGroupStore = init, event: SettingGroupEvent) => {
  switch (event.type) {
    case SettingGroupConstants.GET_SETTING_GROUPS:
      // console.log("GET_SETTING_GROUPS");
      return {
        ...state,
        status: ApiStatus.LOADING,
      };
    case SettingGroupConstants.GET_SETTING_GROUPS_LOADED:
      // console.log("GET_SETTING_GROUPS_LOADED");
      return {
        ...state,
        status: ApiStatus.LOADED,
        settingGroups: event.data,
      };
    default:
      return state;
  }
};


