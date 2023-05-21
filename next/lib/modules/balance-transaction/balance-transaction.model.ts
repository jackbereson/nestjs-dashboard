import { BaseModel } from "../../models/base-model.model";

export type CreateBalanceTransactionInput = {
  name?: string;
};

export type UpdateBalanceTransactionInput = {
  coin?: Coins;
  value?: number;
  fromBalanceId?: string;
  fromBalanceType?: string;
  toBalanceId?: string;
  toBalanceType?: string;
  status?: BalanceTransactionStatus;
  event?: BalanceTransactionEvents;
  customerId?: string;
};

export enum BalanceTransactionArgNames {
  coin = "coin",
  value = "value",
  fromBalanceId = "fromBalanceId",
  fromBalanceType = "fromBalanceType",
  toBalanceId = "toBalanceId",
  toBalanceType = "toBalanceType",
  status = "status",
  event = "event",
  customerId = "customerId",
}

export enum BalanceTransactionArgs {
  coin = "coin",
  value = "value",
  fromBalanceId = "fromBalanceId",
  fromBalanceType = "fromBalanceType",
  toBalanceId = "toBalanceId",
  toBalanceType = "toBalanceType",
  status = "status",
  event = "event",
  customerId = "customerId",
}

export enum BalanceTransactionEvents {
  TRANSFER = "TRANSFER",
  BET_LUCKY_NUMBER = "BET_LUCKY_NUMBER",
  LUCKY_NUMBER_RESULT = "LUCKY_NUMBER_RESULT",
  STAKING = "STAKING",
  SEEDSALE = "SEEDSALE",

  BET_KENO = "BET_KENO",
  BET_HIGH_LOW = "BET_HIGH_LOW",
  BET_SPORT = "BET_SPORT",

  HIGH_LOW_RESULT = "HIGH_LOW_RESULT",
  KENO_RESULT = "KENO_RESULT",
  SPORT_RESULT = "SPORT_RESULT",
}

export enum Coins {
  DOX = "DOX",
  BTC = "BTC",
  BNB = "BNB",
  BUSD = "BUSD",
  USDT = "USDT",
  ETH = "ETH",
  ETHW = "ETHW",
}

export enum TransactionBalanceTypes {
  FUNDING = "FUNDING",
  WITHDRAW = "WITHDRAW",
  STAKING = "STAKING",
  LENDING = "LENDING",
  MINING = "MINING",
  LUCKY_NUMBER = "LUCKY_NUMBER",
  SYSTEM = "SYSTEM",
}

export enum BalanceTransactionStatus {
  PENDING = "PENDING", // chờ  xu lý
  DONE = "DONE", //  xu ly xong
}

export interface BalanceTransaction extends BaseModel {
  coin?: Coins;
  value?: number;
  fromBalanceId?: string;
  fromBalanceType?: string;
  toBalanceId?: string;
  toBalanceType?: string;
  status?: BalanceTransactionStatus;
  event?: BalanceTransactionEvents;
  customerId?: string;
}

export const BalanceTransactionInitialValues: CreateBalanceTransactionInput = {
  name: "",
};
