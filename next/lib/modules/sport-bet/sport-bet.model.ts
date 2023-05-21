import { BaseModel } from "../../models/base-model.model";

export enum SportBetStatus {
  PENDING = "PENDING",
  DONE = "DONE",
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

export enum SPORT_BET_REQUIRED {
  DOX = 1,
  ETH = 0.0001,
  BTC = 0.000005,
  USDT = 1,
  BUSD = 1,
}

export enum SPORT_BET_IGNORE_COINS {
  BTC = "BTC",
  ETH = "ETH",
  ETHW = "ETHW",
  BNB = "BNB",
}

export type CreateSportBetInput = {
  name?: string;
};

export type UpdateSportBetInput = {
  name?: string;
};

export enum SportBetArgNames {
  name = "name",

  betSide = "betSide",
  winSide = "winSide",
  odd = "odd",
  betAmount = "betAmount",
  winAmount = "winAmount",
  coin = "coin",
  isWin = "isWin",

  sport = "sport",
  sportId = "sportId",
  sportMatchId = "sportMatchId",
  customerId = "customerId",
  status = "status",
}

export enum SportBetArgs {
  name = "name",

  betSide = "betSide",
  winSide = "winSide",
  odd = "odd",
  betAmount = "betAmount",
  winAmount = "winAmount",
  coin = "coin",
  isWin = "isWin",

  sport = "sport",
  sportId = "sportId",
  sportMatchId = "sportMatchId",
  customerId = "customerId",
  status = "status",
}

export interface SportBet extends BaseModel {
  name?: string;

  betSide?: string;
  winSide?: string;
  odd?: number;
  betAmount?: number;
  winAmount?: number;
  coin?: Coins;
  isWin?: boolean;

  sport?: string;
  sportId?: string;
  sportMatchId?: string;
  customerId?: string;
  status?: SportBetStatus;
}

export const SportBetInitialValues: CreateSportBetInput = {
  name: "",
};
