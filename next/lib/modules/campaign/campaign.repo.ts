import { CrudRepository } from "../../repo/crud.repo";
import { Campaign } from "./campaign.model";
import { CampaignFields } from "./campaign.field";

export class CampaignRepository extends CrudRepository<Campaign> {

  apiName = "Campaign";

  shortFragment = this.parseFragment(`
    ${CampaignFields}
  `);

  fullFragment = this.parseFragment(`
    ${CampaignFields}
  `);

}

export const CampaignService = new CampaignRepository();