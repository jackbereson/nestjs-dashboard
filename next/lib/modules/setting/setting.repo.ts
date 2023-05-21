import { CrudRepository } from "../../repo/crud.repo";
import { settingGroupFields } from "../setting-group/setting-group.field";
import { settingFields } from "./setting.field";
import { Setting } from "./setting.model";

export class SettingRepository extends CrudRepository<Setting> {
  apiName: string = "Setting";
  shortFragment: string = this.parseFragment(`
    ${settingFields}
  `);
  fullFragment: string = this.parseFragment(`
    ${settingFields}
    group {
      ${settingGroupFields}
    }: SettingGroup
  `);
}

export const SettingService = new SettingRepository();
