import { CrudRepository } from "../../repo/crud.repo";
import { NftLauchpadPackage } from "./nft-lauchpad-package.model";
import { NftLauchpadPackageFields } from "./nft-lauchpad-package.field";

export class NftLauchpadPackageRepository extends CrudRepository<NftLauchpadPackage> {

  apiName = "NftLauchpadPackage";

  shortFragment = this.parseFragment(`
    ${NftLauchpadPackageFields}
  `);

  fullFragment = this.parseFragment(`
    ${NftLauchpadPackageFields}
  `);

}

export const NftLauchpadPackageService = new NftLauchpadPackageRepository();