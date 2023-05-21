import { BaseModel } from "../../models/base-model.model";
import { Customer } from "../customer/customer.model";
import { User } from "../user/user.model";

export enum ActivityTypes {
  ADMIN_SIGNIN = "ADMIN_SIGNIN",
  CUSTOMER_SIGNIN = "CUSTOMER_SIGNIN",
  CUSTOMER_BUY_TOKEN = "CUSTOMER_BUY_TOKEN",
  CUSTOMER_CLAIM_TOKEN = "CUSTOMER_CLAIM_TOKEN",
  CUSTOMER_AIRDROP = "CUSTOMER_AIRDROP",
  CUSTOMER_LIST_NFT = "CUSTOMER_LIST_NFT",
  CUSTOMER_CREATE_SUPPORT = "CUSTOMER_CREATE_SUPPORT",
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
}

export enum ChangedFactors {
  TYPE_EVENT = "TYPE_EVENT",
  CAMPAIGN = "CAMPAIGN",
  TRANSACTION = "TRANSACTION",
  NFT = "NFT",
  NFT_AIRDROP = "NFT_AIRDROP",
  NFT_INFO = "NFT_INFO",
  NFT_CATEGORY = "NFT_CATEGORY",
  NFT_ELEMENT = "NFT_ELEMENT",
  NFT_HABITANT = "NFT_HABITANT",
  NFT_RARITY = "NFT_RARITY",
  NFT_TYPE = "NFT_TYPE",
  USER = "USER",
  CUSTOMER = "CUSTOMER",
  SETTING = "SETTING",
  JOBS = "JOBS",
  PROVIDER = "PROVIDER",
  SUPPORT = "SUPPORT",
}

export type CreateActivityInput = {
  name?: string;
};

export type UpdateActivityInput = {
  name?: string;
};

export enum ActivityArgNames {
  userId = "User",
  customerId = "Customer",
  factorId = "FactorId",
  message = "Message",
  type = "Type",
  changedFactor = "Table",
  user = "user",
  customer = "customer",
}

export enum ActivityArgs {
  userId = "userId",
  customerId = "customerId",
  factorId = "factorId",
  message = "message",
  type = "type",
  changedFactor = "changedFactor",
  user = "user",
  customer = "customer",
}

export interface Activity extends BaseModel {
  userId?: string;
  customerId?: string;
  factorId?: string;
  message?: string;
  type?: ActivityTypes;
  changedFactor?: ChangedFactors;
  user?: User;
  customer?: Customer;
}

export const ActivityInitialValues: CreateActivityInput = {
  name: "",
};
