---
to: next/lib/modules/<%= h.changeCase.paramCase(name) %>/<%= h.changeCase.paramCase(name) %>.repo.ts
---
import { CrudRepository } from "../../repo/crud.repo";
import { <%= h.inflection.camelize(name) %> } from "./<%= h.changeCase.paramCase(name) %>.model";
import { <%= h.inflection.camelize(name) %>Fields } from "./<%= h.changeCase.paramCase(name) %>.field";

export class <%= h.inflection.camelize(name) %>Repository extends CrudRepository<<%= h.inflection.camelize(name) %>> {

  apiName = "<%= h.inflection.camelize(name) %>";

  shortFragment = this.parseFragment(`
    ${<%= h.inflection.camelize(name) %>Fields}
  `);

  fullFragment = this.parseFragment(`
    ${<%= h.inflection.camelize(name) %>Fields}
  `);

}

export const <%= h.inflection.camelize(name) %>Service = new <%= h.inflection.camelize(name) %>Repository();