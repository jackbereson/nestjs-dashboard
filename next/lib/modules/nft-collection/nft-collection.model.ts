import { BaseModel } from "../../models/base-model.model";

export type CreateNftCollectionInput = {
  name?: string;
};

export type UpdateNftCollectionInput = {
  name?: string;
};

export enum NftCollectionArgNames {
  name = "Name",
}

export enum NftCollectionArgs {
  name = "name",
}
export enum Tokens {
  ETH = "ETH",
  ICP = "ICP",
}

export enum Projects {
  DC8 = "DC8",
  ICP = "ICP",
  OTHER = "OTHER",
}

export interface NftCollection extends BaseModel {
  name?: string;
  summary?: string;
  description?: string;

  slug?: string;
  url?: string;
  address?: string;

  token?: Tokens;
  project?: Projects;

  imageUrl?: string;
  featureImageUrl?: string;
  bannerUrl?: string;

  rankNumber?: number;
  topNumber?: number;

  customerId?: string;

  floorPrice?: number;
  listing?: number;
  volumeTrade?: number;
  owners?: number;
}
export const NftCollectionInitialValues: CreateNftCollectionInput = {
  name: "",
};
