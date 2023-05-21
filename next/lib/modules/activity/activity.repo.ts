import { CrudRepository } from "../../repo/crud.repo";
import { Activity } from "./activity.model";
import { ActivityFields } from "./activity.field";
import { CustomerService } from "../customer/customer.repo";
import { UserService } from "../user/user.repo";

export class ActivityRepository extends CrudRepository<Activity> {

  apiName = "Activity";

  shortFragment = this.parseFragment(`
    ${ActivityFields}
  `);

  fullFragment = this.parseFragment(`
    ${ActivityFields}
    customer {
      ${CustomerService.fullFragment}
    }
    user {
      ${UserService.fullFragment}
    }
  `);

}

export const ActivityService = new ActivityRepository();