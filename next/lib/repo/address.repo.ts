import { GraphRepository } from "./graph.repo";

export class AddressRepository extends GraphRepository {
  async getProvinces(): Promise<{
    id: string
    province: string
  }[]> {
    const api = "getProvince";
    const result = await this.apollo.query({
      query: this.gql`
        query {
          ${api} {
            id
            province
          }
        }
      `,
    });
    this.handleError(result);
    return result.data[api] as any[];
  }
  async getDistricts(provinceId: string) {
    const api = "getDistrict";
    const result = await this.apollo.query({
      query: this.gql`
        query {
          ${api}(provinceId: "${provinceId}") {
            id
            district
          }
        }
      `,
    });
    this.handleError(result);
    return result.data[api] as any[];
  }
  async getWards(districtId: string) {
    const api = "getWard";
    const result = await this.apollo.query({
      query: this.gql`
        query {
          ${api}(districtId: "${districtId}") {
            id
            ward
          }
        }
      `,
    });
    this.handleError(result);
    return result.data[api] as any[];
  }
}

export const AddressService = new AddressRepository();
