import { BaseModel } from "../../models/base-model.model";

export type CreateCustomerBalanceInput = {
  coin?: Coins;
  balance?: number;
  type?: BalanceTypes;
  status?: BalanceStatus;
  customerId?: string;
  approved?: boolean;
};

export type UpdateCustomerBalanceInput = {
  coin?: Coins;
  balance?: number;
  type?: BalanceTypes;
  status?: BalanceStatus;
  customerId?: string;
  approved?: boolean;
};

export enum CustomerBalanceArgNames {
  coin = "coin",
  balance = "balance",
  type = "type",
  status = "status",
  customerId = "customerId",
  approved = "approved",
}

export enum CustomerBalanceArgs {
  coin = "coin",
  balance = "balance",
  type = "type",
  status = "status",
  customerId = "customerId",
  approved = "approved",
}

export enum BalanceTypes {
  FUNDING = "FUNDING",
  WITHDRAW = "WITHDRAW",
  STAKING = "STAKING",
  LENDING = "LENDING",
  MINING = "MINING",
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

export enum BalanceStatus {
  ACTIVE = "ACTIVE",
  DEACTIVE = "DEACTIVE",
  PENDING = "PENDING",
}

export interface CustomerBalance extends BaseModel {
  coin?: Coins;
  balance?: number;
  type?: BalanceTypes;
  status?: BalanceStatus;
  customerId?: string;
  approved?: boolean;
}

export const CustomerBalanceInitialValues: CreateCustomerBalanceInput = {
  coin: Coins.BNB,
};
