import { BaseModel } from "../../models/base-model.model";
import { Tokens } from "../nft-collection/nft-collection.model";

export type CreateNftLaunchpadInput = {
  name?: string;
};

export type UpdateNftLaunchpadInput = {
  name?: string;
};

export enum NftLaunchpadArgNames {
  name = "Name",
}

export enum NftLaunchpadArgs {
  name = "name",
}

export enum NftLaunchpadStatus {
  FEATURED = "FEATURED",
  LISTED = "LISTED",
  DEACTIVED = "DEACTIVED",
}

export interface NftLaunchpad extends BaseModel {
  name?: string;
  subname?: string;
  summary?: string;
  description?: string;
  slug?: string;

  nftPrice?: number;
  poolSize?: number;
  hardCap?: number;
  remaining?: number;
  totalAmount?: number;
  followers?: number;
  totalRise?: number;

  token?: Tokens;

  imageUrl?: string;
  logoUrl?: string;

  status?: NftLaunchpadStatus;
  customerId?: string;
}

export const NftLaunchpadInitialValues: CreateNftLaunchpadInput = {
  name: "",
};
