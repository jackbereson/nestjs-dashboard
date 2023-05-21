import { GetListData } from "../../lib/models/base-model.model";
import { SettingGroup } from "../../lib/modules/setting-group/setting-group.model";
import { SettingGroupService } from "../../lib/modules/setting-group/setting-group.repo";
import { Setting } from "../../lib/modules/setting/setting.model";
import { getUserToken } from "../../lib/modules/user/user.model";

export enum SettingGroupConstants {
  GET_SETTING_GROUPS = "GET_SETTING_GROUPS",
  GET_SETTING_GROUPS_LOADED = "GET_SETTING_GROUPS_LOADED",
}

export type SettingGroupEvent =
  | { type: SettingGroupConstants.GET_SETTING_GROUPS }
  | { type: SettingGroupConstants.GET_SETTING_GROUPS_LOADED; data: Setting[] };

export const getSettingGroups =
  (params?: any, handleError?: (error: Error) => void) =>
  (dispatch: any): SettingGroupEvent => {
    const handleResult = ({ data }: GetListData<SettingGroup>) => {
      return dispatch({ type: SettingGroupConstants.GET_SETTING_GROUPS_LOADED, data });
    };

    const token = getUserToken(false);

    SettingGroupService.getAll({
      query: { limit: 100000 },
      fragment: SettingGroupService.fullFragment,
      token,
    })
      .then(handleResult)
      .catch(handleError);

    return dispatch({ type: SettingGroupConstants.GET_SETTING_GROUPS });
  };
