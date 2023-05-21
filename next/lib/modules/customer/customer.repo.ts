import { CrudRepository } from "../../repo/crud.repo";
import { Customer } from "./customer.model";
import { CustomerFields, CustomerQuery } from "./customer.field";

export class CustomerRepository extends CrudRepository<Customer> {
  apiName = "Customer";

  shortFragment = this.parseFragment(`
    ${CustomerFields}
  `);

  fullFragment = this.parseFragment(`
    ${CustomerFields}
  `);
}

export const CustomerService = new CustomerRepository();
