import { CrudRepository } from "../../repo/crud.repo";
import { NftInventory } from "./nft-inventory.model";
import { NftInventoryFields } from "./nft-inventory.field";

export class NftInventoryRepository extends CrudRepository<NftInventory> {

  apiName = "NftInventory";

  shortFragment = this.parseFragment(`
    ${NftInventoryFields}
  `);

  fullFragment = this.parseFragment(`
    ${NftInventoryFields}
  `);

}

export const NftInventoryService = new NftInventoryRepository();