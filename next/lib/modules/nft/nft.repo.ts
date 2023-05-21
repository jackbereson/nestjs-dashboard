import { CrudRepository } from "../../repo/crud.repo";
import { Nft } from "./nft.model";
import { NftFields, NftQuery } from "./nft.field";
import { MutationOptions } from "@apollo/client";

export class NftRepository extends CrudRepository<Nft> {
  apiName = "Nft";

  shortFragment = this.parseFragment(`
    ${NftFields}
  `);

  fullFragment = this.parseFragment(`
    ${NftFields}
  `);

  async importNftsByJsonResouce({
    token,
    listJson,
    fromRareRate,
    toRareRate,
    groupName,
  }: {
    token: string;
    listJson: string;
    fromRareRate: number;
    toRareRate: number;
    groupName?: string;
  }) {
    const api = "importNftsByJsonResouce";
    const data = Buffer.from(listJson).toString("base64");
    const options = {
      mutation: this.gql`
      mutation {
        ${api}(
          ${`listJson: "${data}"`},
          ${`fromRareRate: ${fromRareRate}`},
          ${`toRareRate: ${toRareRate}`},
          ${`groupName: ${groupName ? `"${groupName}"` : null}`}) {
          success
        }
      }
    `,
      fetchPolicy: "no-cache",
    } as MutationOptions;

    if (token) options.context = { headers: { "x-token": token } };

    const result = await this.apollo.mutate(options);
    this.handleError(result);
    return result.data["g0"] as { success: boolean };
  }
}

export const NftService = new NftRepository();
