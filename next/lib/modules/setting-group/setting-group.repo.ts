import { MutationOptions } from "@apollo/client";
import { CrudRepository } from "../../repo/crud.repo";
import { settingFields } from "../setting/setting.field";
import { getUserToken } from "../user/user.model";
import { settingGroupFields, settingGroupQuery } from "./setting-group.field";
import { SettingGroup } from "./setting-group.model";

export class SettingGroupRepository extends CrudRepository<SettingGroup> {
  apiName: string = "SettingGroup";
  shortFragment: string = this.parseFragment(`
    ${settingGroupFields}
  `);
  fullFragment: string = this.parseFragment(`
    ${settingGroupFields}
    settings {
      ${settingFields}
    }: [Setting]
  `);

  async resetSettingGroup({ id, token }: { id: string; token: string }) {
    const api = "resetSettingGroup";

    const option: MutationOptions = {
      mutation: this.gql`
      mutation {
        ${api}(id: "${id}") {
          ${settingGroupQuery}
        }
      }
    `,
    };

    option.context = { headers: { "x-token": token } };
    const result = await this.apollo.mutate(option);
    this.handleError(result);
    return result.data[api] as SettingGroup;
  }
}

export const SettingGroupService = new SettingGroupRepository();
