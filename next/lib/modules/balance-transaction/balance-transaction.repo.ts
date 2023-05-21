import { CrudRepository } from "../../repo/crud.repo";
import { BalanceTransaction } from "./balance-transaction.model";
import { BalanceTransactionFields } from "./balance-transaction.field";

export class BalanceTransactionRepository extends CrudRepository<BalanceTransaction> {

  apiName = "BalanceTransaction";

  shortFragment = this.parseFragment(`
    ${BalanceTransactionFields}
  `);

  fullFragment = this.parseFragment(`
    ${BalanceTransactionFields}
  `);

}

export const BalanceTransactionService = new BalanceTransactionRepository();