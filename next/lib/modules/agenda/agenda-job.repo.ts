import { CrudRepository } from "../../repo/crud.repo";
import { agendaJobFields } from "./agenda-job.field";
import { AgendaJob } from "./agenda-job.model";
import { userFields } from "../user/user.field";

export class AgendaJobRepository extends CrudRepository<AgendaJob> {
  apiName = "AgendaJob";
  shortFragment = this.parseFragment(agendaJobFields);
  fullFragment = this.parseFragment(`
  ${agendaJobFields}
  lastModifiedByUser{
    ${userFields}
  }
  `);
}

export const AgendaJobService = new AgendaJobRepository();
