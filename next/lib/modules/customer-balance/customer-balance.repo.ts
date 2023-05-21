import { CrudRepository } from "../../repo/crud.repo";
import { CustomerBalance } from "./customer-balance.model";
import { CustomerBalanceFields } from "./customer-balance.field";

export class CustomerBalanceRepository extends CrudRepository<CustomerBalance> {

  apiName = "CustomerBalance";

  shortFragment = this.parseFragment(`
    ${CustomerBalanceFields}
  `);

  fullFragment = this.parseFragment(`
    ${CustomerBalanceFields}
  `);

}

export const CustomerBalanceService = new CustomerBalanceRepository();