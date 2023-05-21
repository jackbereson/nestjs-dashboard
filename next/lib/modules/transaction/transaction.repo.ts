import { CrudRepository } from "../../repo/crud.repo";
import { Transaction, TransactionEvent } from "./transaction.model";
import { TransactionFields, TransactionQuery } from "./transaction.field";
import { MutationOptions } from "@apollo/client";

export class TransactionRepository extends CrudRepository<Transaction> {
  apiName = "Transaction";

  shortFragment = this.parseFragment(`
    ${TransactionFields}
  `);

  fullFragment = this.parseFragment(`
    ${TransactionFields}
  `);

  setSMSetting = async ({
    transactionHash,
    blockNumber,
    event,
    value,
    token,
  }: {
    transactionHash: string;
    blockNumber: number;
    event: TransactionEvent;
    value: boolean;
    token: string;
  }) => {
    const api = "setSMSetting";

    const options: MutationOptions = {
      mutation: this.gql`
        mutation {
          ${api}(
            transactionHash: "${transactionHash}",
            blockNumber:"${blockNumber}",
            event: "${event}",
            value: "${value}"
            ) {
              ${TransactionQuery}
          }
        }
      `,
    };

    if (token) options.context = { headers: { "x-token": token } };

    const result = await this.apollo.mutate(options);
    this.handleError(result);
    return result.data[api] as Transaction;
  };
}

export const TransactionService = new TransactionRepository();
