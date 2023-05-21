import { CrudRepository } from "../../repo/crud.repo";
import { SportMatch } from "./sport-match.model";
import { SportMatchFields } from "./sport-match.field";

export class SportMatchRepository extends CrudRepository<SportMatch> {

  apiName = "SportMatch";

  shortFragment = this.parseFragment(`
    ${SportMatchFields}
  `);

  fullFragment = this.parseFragment(`
    ${SportMatchFields}
  `);

}

export const SportMatchService = new SportMatchRepository();