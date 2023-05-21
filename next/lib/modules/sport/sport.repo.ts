import { CrudRepository } from "../../repo/crud.repo";
import { Sport } from "./sport.model";
import { SportFields } from "./sport.field";

export class SportRepository extends CrudRepository<Sport> {

  apiName = "Sport";

  shortFragment = this.parseFragment(`
    ${SportFields}
  `);

  fullFragment = this.parseFragment(`
    ${SportFields}
  `);

}

export const SportService = new SportRepository();