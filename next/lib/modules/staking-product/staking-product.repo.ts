import { CrudRepository } from "../../repo/crud.repo";
import { StakingProduct } from "./staking-product.model";
import { StakingProductFields } from "./staking-product.field";

export class StakingProductRepository extends CrudRepository<StakingProduct> {

  apiName = "StakingProduct";

  shortFragment = this.parseFragment(`
    ${StakingProductFields}
  `);

  fullFragment = this.parseFragment(`
    ${StakingProductFields}
  `);

}

export const StakingProductService = new StakingProductRepository();