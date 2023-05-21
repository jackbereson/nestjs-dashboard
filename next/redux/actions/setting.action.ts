import { SettingKeys } from "../../lib/helpers/setting.helper";
import { Setting } from "../../lib/modules/setting/setting.model";
import { SettingService } from "../../lib/modules/setting/setting.repo";

export enum SettingConstants {
  GET_SETTINGS = "GET_SETTINGS",
  GET_SETTINGS_LOADED = "GET_SETTINGS_LOADED",
}

export type SettingEvent =
  | { type: SettingConstants.GET_SETTINGS }
  | { type: SettingConstants.GET_SETTINGS_LOADED; data: Setting[] };

export const getSettings =
  (params?: any, handleError?: (error: Error) => void) =>
  (dispatch: any): SettingEvent => {
    const handleResult = ({ data }: any) => {
      return dispatch({ type: SettingConstants.GET_SETTINGS_LOADED, data });
    };

    SettingService.getAll({
      query: {
        limit: 0,
        filter: {
          key: {
            __in: [
              SettingKeys.TITLE,
              SettingKeys.LOGO_URL,
              SettingKeys.USE_MENU_CATEGORY,
              SettingKeys.MENU_CATEGORIES,
              SettingKeys.ADMIN_MENU,
              SettingKeys.EDITOR_MENU,
            ],
          },
        },
      },
    })
      .then(handleResult)
      .catch(handleError);

    return dispatch({ type: SettingConstants.GET_SETTINGS });
  };
