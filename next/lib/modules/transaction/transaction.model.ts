import { BaseModel } from "../../models/base-model.model";

export enum TransactionEvent {
  PURCHASE_NFT = "PURCHASE_NFT",
  LIST = "LIST_NFT",
  MINTED = "MINTED",
  TRANSFER_NFT = "TRANSFER_NFT",
  SALE = "SALE",
  BUY_PACKAGE_NFT = "BUY_PACKAGE_NFT",
  OPEN_PACKAGE_NFT = "OPEN_PACKAGE_NFT",
  CANCEL_LISTING = "CANCEL_LISTING",
  APPROVE = "APPROVE",
  ALLOW_SALE = "ALLOW_SALE",
  ALLOW_PKG = "ALLOW_PKG",
  ALLOW_PRIVATE_SALE = "ALLOW_PRIVATE_SALE",
  UNKNOWN = "UNKNOWN",

  SEED_SALE = "SEED_SALE",
  FAUCET = "FAUCET",
  PRIVATE_SALE = "PRIVATE_SALE",
  AIRDROP = "AIRDROP",
  STAKING = "STAKING",
  FARMING = "FARMING",
  BUY_TOKEN = "BUY_TOKEN",
  VEST = "VEST",
}

export enum TOKEN_TYPES {
  DOX = "DOX",
  ETH = "ETH",
  BTC = "BTC",
  USDT = "USDT",
  BUSD = "BUSD",
  BNB = "BNB",
}

export enum TOKEN_REQUIRED {
  DOX = 1,
  ETH = 0.0001,
  BTC = 0.000005,
  USDT = 1,
  BUSD = 1,
}

export enum TOKEN_TYPE_CODES {
  DOX = 1,
  ETH = 2,
  BTC = 3,
  USDT = 4,
  BUSD = 5,
}

export enum TokenStringTypes {
  USDT = "USDT",
  BUSD = "BUSD",
}

export enum TokenTypeNumbers {
  USDT = "1",
  BUSD = "2",
}

export enum TransactionTypes {
  TOKEN = "TOKEN",
  NFT = "NFT",
}

export enum TransactionStatus {
  PENDING = "PENDING", // chờ blockchain xu lý
  DONE = "DONE", // blockchain xu ly xong
}

export interface Transaction extends BaseModel {
  transactionHash?: string;
  status?: TransactionStatus;
  event?: TransactionEvent;
  blockNumber?: number;

  price?: number;
  value?: any;
  weiValue?: any;

  tokenType?: string;

  type?: TransactionTypes;
  fromCustomerId?: string;
  fromAddress?: string;
  toCustomerId?: string;
  toAddress?: string;

  nftInventoryId?: string;
  nftLaunchpadId?: string;
  nftLaunchpadPackageId?: string;
  nftId?: string;

  farmProductId?: string;
  farmBalanceId?: string;

  vestId?: string;
  vestProductId?: string;
}

export type UpdateTransactionInput = {
  name?: string;
};

export enum TransactionArgNames {
  transactionHash = "transactionHash",
  status = "status",
  event = "event",
  blockNumber = "blockNumber",
  price = "price",
  value = "value",
  weiValue = "weiValue",
  tokenType = "tokenType",
  type = "type",
  fromCustomerId = "fromCustomerId",
  fromAddress = "fromAddress",
  toCustomerId = "toCustomerId",
  toAddress = "toAddress",
  nftInventoryId = "nftInventoryId",
  nftLaunchpadId = "nftLaunchpadId",
  nftLaunchpadPackageId = "nftLaunchpadPackageId",
  nftId = "nftId",
}

export enum TransactionArgs {
  transactionHash = "transactionHash",
  status = "status",
  event = "event",
  blockNumber = "blockNumber",

  price = "price",
  value = "value",
  weiValue = "weiValue",

  tokenType = "tokenType",

  type = "type",
  fromCustomerId = "fromCustomerId",
  fromAddress = "fromAddress",
  toCustomerId = "toCustomerId",
  toAddress = "toAddress",

  nftInventoryId = "nftInventoryId",
  nftLaunchpadId = "nftLaunchpadId",
  nftLaunchpadPackageId = "nftLaunchpadPackageId",
  nftId = "nftId",
}