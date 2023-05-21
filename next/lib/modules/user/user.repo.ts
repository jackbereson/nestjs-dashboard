import { MutationOptions, QueryOptions } from "@apollo/client/core";
import gql from "graphql-tag";
import { CrudRepository } from "../../repo/crud.repo";
import { userFields, userQuery } from "./user.field";
import { User } from "./user.model";

export class UserRepository extends CrudRepository<User> {
  apiName = "User";

  shortFragment = this.parseFragment(`
    ${userFields}
  `);
  fullFragment = this.parseFragment(`
    ${userFields}
  `);

  async signupUserByEmail(email: string, password: string) {
    const api = "signupUserByEmail";

    const option: MutationOptions = {
      mutation: gql`
        mutation {
          ${api}(email: "${email}") {
            user { ${userQuery} }
            token
          }
        }
      `,
    };

    option.context = { headers: { "y-token": password } };

    const result = await this.apollo.mutate(option);
    this.handleError(result);
    return result.data[api] as {
      user: User;
      token: string;
    };
  }

  async signupUserByPhone(country: string, phonecode: string, phone: string, password: string,) {
    const api = "signupUserByPhone";

    const option: MutationOptions = {
      mutation: gql`
        mutation {
          ${api}(phone: "${phone}", country: "${country}", phonecode: "${phonecode}") {
            user { ${userQuery} }
            token
          }
        }
      `,
    };

    option.context = { headers: { "y-token": password } };

    const result = await this.apollo.mutate(option);
    this.handleError(result);
    return result.data[api] as {
      user: User;
      token: string;
    };
  }

  async signinUserByEmail(email: string, password: string) {
    const api = "signinUserByEmail";

    const option: MutationOptions = {
      mutation: gql`
        mutation {
          ${api}(email: "${email}") {
            user { ${userQuery} }
            token
          }
        }
      `,
    };

    option.context = { headers: { "y-token": password } };

    const result = await this.apollo.mutate(option);
    this.handleError(result);
    return result.data[api] as {
      user: User;
      token: string;
    };
  }

  async signinUserByPhone(phone: string, password: string) {
    const api = "signinUserByPhone";

    const option: MutationOptions = {
      mutation: gql`
        mutation {
          ${api}(phone: "${phone}") {
            user { ${userQuery} }
            token
          }
        }
      `,
    };

    option.context = { headers: { "y-token": password } };

    const result = await this.apollo.mutate(option);
    this.handleError(result);
    return result.data[api] as {
      user: User;
      token: string;
    };
  }

  async userGetMe(token?: string) {
    const api = "userGetMe";
    const option: QueryOptions = {
      query: gql`query {  ${api} { ${this.fullFragment} }}`,
    };
    if (token) option.context = { headers: { "x-token": token } };
    return await this.apollo.query(option);
  }

}

export const UserService = new UserRepository();