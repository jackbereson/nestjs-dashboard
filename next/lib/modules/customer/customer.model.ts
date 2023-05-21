import { BaseModel } from "../../models/base-model.model";

export enum CustomerStatus {
  ACTIVE = "ACTIVE",
  DEACTIVED = "DEACTIVED",
}

export enum CustomerWalletType {
  METAMASK = "METAMASK",
  C98 = "C98",
  MATH = "MATH",
  BINANCE_CHAIN = "BINANCE_CHAIN",
  BITKEEP = "BITKEEP",
  WALLETCONNECT = "WALLETCONNECT",
  COINBASE = "COINBASE",
}

export const customerWalletTypeData = [
  "METAMASK",
  "TRUST",
  "MATH",
  "WALLETCONNECT",
  "BINANCE_CHAIN",
  "COINBASE",
  "BITKEEP",
];

export const customerStatusData = [
  {
    value: CustomerStatus.ACTIVE,
    name: "ACTIVE",
  },
  {
    value: CustomerStatus.DEACTIVED,
    name: "DEACTIVED",
  },
];

export type UpdateCustomerInput = {
  status?: string;
  approved?: boolean;
};

export enum CustomerArgNames {
  id = "Id",
  username = "Username",
  address = "Address",
  email = "Email",
  referral = "Referral",
  shortUrl = "ShortUrl",
  activedAt = "ActivedAt",
  role = "Role",
  nonce = "Nonce",
  addressIp = "Address Ip",
  bannerUrl = "Banner Url",
  avatarUrl = "Avatar Url",
  approved = "Approved",
  dangerous = "Dangerous",
  walletType = "Wallet Type",
  status = "Status",
  level = "Level",
  maxEXP = "Max Exp",
  currentExp = "Current Exp",
  isMiner = "Is Miner",
}

export enum CustomerArgs {
  id = "id",
  username = "username",
  address = "address",
  email = "email",
  referral = "referral",
  shortUrl = "shortUrl",
  activedAt = "activedAt",
  role = "role",
  nonce = "nonce",
  addressIp = "addressIp",

  bannerUrl = "bannerUrl",
  avatarUrl = "avatarUrl",
  approved = "approved",

  dangerous = "dangerous",

  walletType = "walletType",
  status = "status",

  level = "level",
  maxEXP = "maxEXP",
  currentExp = "currentExp",

  isMiner = "isMiner",
}

export interface Customer extends BaseModel {
  username?: string;
  address?: string;
  email?: string;
  referral?: string;
  shortUrl?: string;
  activedAt?: Date;
  role?: string;
  nonce?: string;
  addressIp?: string; // address

  bannerUrl?: string;
  avatarUrl?: string;
  approved?: boolean;

  dangerous?: boolean;

  walletType?: CustomerWalletType;
  status?: CustomerStatus;

  level?: number;
  maxEXP?: number;
  currentExp?: number;

  isMiner?: boolean;
}
