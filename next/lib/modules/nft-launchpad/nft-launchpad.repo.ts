import { CrudRepository } from "../../repo/crud.repo";
import { NftLaunchpad } from "./nft-launchpad.model";
import { NftLaunchpadFields } from "./nft-launchpad.field";

export class NftLaunchpadRepository extends CrudRepository<NftLaunchpad> {

  apiName = "NftLaunchpad";

  shortFragment = this.parseFragment(`
    ${NftLaunchpadFields}
  `);

  fullFragment = this.parseFragment(`
    ${NftLaunchpadFields}
  `);

}

export const NftLaunchpadService = new NftLaunchpadRepository();