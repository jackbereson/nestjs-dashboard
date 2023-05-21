import { CrudRepository } from "../../repo/crud.repo";
import { NftCollection } from "./nft-collection.model";
import { NftCollectionFields } from "./nft-collection.field";

export class NftCollectionRepository extends CrudRepository<NftCollection> {

  apiName = "NftCollection";

  shortFragment = this.parseFragment(`
    ${NftCollectionFields}
  `);

  fullFragment = this.parseFragment(`
    ${NftCollectionFields}
  `);

}

export const NftCollectionService = new NftCollectionRepository();