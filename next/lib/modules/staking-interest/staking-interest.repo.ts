import { CrudRepository } from "../../repo/crud.repo";
import { StakingInterest } from "./staking-interest.model";
import { StakingInterestFields } from "./staking-interest.field";

export class StakingInterestRepository extends CrudRepository<StakingInterest> {

  apiName = "StakingInterest";

  shortFragment = this.parseFragment(`
    ${StakingInterestFields}
  `);

  fullFragment = this.parseFragment(`
    ${StakingInterestFields}
  `);

}

export const StakingInterestService = new StakingInterestRepository();