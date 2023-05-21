import { BaseModel } from "../../models/base-model.model";

export enum NftMarketStatus {
  NO_LIST = "NO_LIST",
  LISTING = "LISTING",
  PENDING = "PENDING",
  UNDEFINED = "UNDEFINED",
}

export enum NftMintedStatus {
  NEW = "NEW",
  PENDING = "PENDING",
  FAILURE = "FAILURE",
  SUCCESS = "SUCCESS",
}

export type CreateNftInput = {
  name?: string;
};

export type UpdateNftInput = {
  name?: string;
};

export enum NftArgNames {
  name = "name",
  tokenId = "tokenId",
  transactionHash = "transactionHash",
  smartContract = "smartContract",
  address = "address",
  blockId = "blockId",

  nickName = "nickName",
  groupName = "groupName",
  description = "description",
  imageUrl = "imageUrl",

  providerName = "providerName",

  rareRate = "rareRate",
  rating = "rating",

  price = "price",

  providerId = "providerId",
  customerId = "customerId",
  attributes = "attributes",

  newest = "newest",

  marketStatus = "marketStatus",
  nftMintedStatus = "nftMintedStatus",
}

export enum NftArgs {
  name = "name",
  tokenId = "tokenId",
  transactionHash = "transactionHash",
  smartContract = "smartContract",
  address = "address",
  blockId = "blockId",

  nickName = "nickName",
  groupName = "groupName",
  description = "description",
  imageUrl = "imageUrl",

  providerName = "providerName",

  rareRate = "rareRate",
  rating = "rating",

  price = "price",

  providerId = "providerId",
  customerId = "customerId",
  attributes = "attributes",

  newest = "newest",

  marketStatus = "marketStatus",
  nftMintedStatus = "nftMintedStatus",
}

export interface Nft extends BaseModel {
  tokenId?: number;
  transactionHash?: string;
  smartContract?: string;
  address?: string;
  blockId?: number;

  nickName?: string;
  name?: string;
  groupName?: string;
  description?: string;
  imageUrl?: string;

  providerName?: string;

  rareRate?: number;
  rating?: number;

  price?: string;

  providerId?: string;
  customerId?: string;
  nftCollectionId?: string;
  nftCollectionSlug?: string;

  attributes?: string;
  newest?: boolean;

  marketStatus?: NftMarketStatus;
  nftMintedStatus?: NftMintedStatus;
}

export const NftInitialValues: CreateNftInput = {
  name: "",
};
