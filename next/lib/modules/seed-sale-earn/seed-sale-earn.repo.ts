import { CrudRepository } from "../../repo/crud.repo";
import { SeedSaleEarn } from "./seed-sale-earn.model";
import { SeedSaleEarnFields } from "./seed-sale-earn.field";

export class SeedSaleEarnRepository extends CrudRepository<SeedSaleEarn> {

  apiName = "SeedSaleEarn";

  shortFragment = this.parseFragment(`
    ${SeedSaleEarnFields}
  `);

  fullFragment = this.parseFragment(`
    ${SeedSaleEarnFields}
  `);

}

export const SeedSaleEarnService = new SeedSaleEarnRepository();