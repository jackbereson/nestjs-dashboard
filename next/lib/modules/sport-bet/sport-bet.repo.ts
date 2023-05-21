import { CrudRepository } from "../../repo/crud.repo";
import { SportBet } from "./sport-bet.model";
import { SportBetFields } from "./sport-bet.field";
import { MutationOptions } from "@apollo/client";

export class SportBetRepository extends CrudRepository<SportBet> {
  apiName = "SportBet";

  shortFragment = this.parseFragment(`
    ${SportBetFields}
  `);

  fullFragment = this.parseFragment(`
    ${SportBetFields}
  `);

  async checkBetwin({ token, coin }: { token: string; coin: string }) {
    const api = "checkBetwin";
    const options = {
      mutation: this.gql`
      mutation {
        ${api}(
          ${`coin: "${coin}"`}
        ) {
          success
        }
      }
    `,
      fetchPolicy: "no-cache",
    } as MutationOptions;

    if (token) options.context = { headers: { "x-token": token } };

    const result = await this.apollo.mutate(options);
    this.handleError(result);
    console.log('result.data["g0"]', result.data.checkBetwin);
    return result.data.checkBetwin as { success: boolean };
  }
}

export const SportBetService = new SportBetRepository();
