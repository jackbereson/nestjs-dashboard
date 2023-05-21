import { BaseModel } from "../../models/base-model.model";

export type CreateNftLauchpadPackageInput = {
  name?: string;
};

export type UpdateNftLauchpadPackageInput = {
  name?: string;
};

export enum NftLauchpadPackageArgNames {
  name = "Name",
}

export enum NftLauchpadPackageArgs {
  name = "name",
}

export interface NftLauchpadPackage extends BaseModel {
  name?: string;
  price?: number;
  mediaUrl?: string;
  quantity?: number;
  seedElement?: number[];
  nftLaunchpadId?: string;
}

export const NftLauchpadPackageInitialValues: CreateNftLauchpadPackageInput = {
  name: "",
};
