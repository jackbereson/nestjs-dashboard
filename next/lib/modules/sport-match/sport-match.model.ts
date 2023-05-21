import { BaseModel } from "../../models/base-model.model";

export enum SportMatchStatus {
  NOT_YET = "NOT_YET",
  LIVE = "LIVE",
  CHECK_WIN = "CHECK_WIN",
  END = "END",
}

export const sportMatchStatusData = [
  {
    value: SportMatchStatus.NOT_YET,
    name: "NOT_YET",
  },
  {
    value: SportMatchStatus.LIVE,
    name: "LIVE",
  },
  {
    value: SportMatchStatus.CHECK_WIN,
    name: "CHECK_WIN",
  },
  {
    value: SportMatchStatus.END,
    name: "END",
  },
];

export enum SportMatchTypes {
  SOCCER = "SOCCER",
  TENNIS = "TENNIS",
}

export type CreateSportMatchInput = {
  name?: string;

  sideA?: string;
  sideB?: string;

  flagA?: string;
  flagB?: string;

  scoreA?: number;
  scoreB?: number;

  sport?: string;
  sportId?: string;

  type?: SportMatchTypes;
  status?: SportMatchStatus;
  sportRadar?: string;
  startTime?: Date;
  endTime?: Date;

  // soccer
  oddA?: number;
  oddDraw?: number;
  oddB?: number;
};

export type UpdateSportMatchInput = {
  name?: string;

  sideA?: string;
  sideB?: string;

  flagA?: string;
  flagB?: string;

  scoreA?: number;
  scoreB?: number;

  sport?: string;
  sportId?: string;

  type?: SportMatchTypes;
  status?: SportMatchStatus;
  sportRadar?: string;
  startTime?: Date;
  endTime?: Date;

  // soccer
  oddA?: number;
  oddDraw?: number;
  oddB?: number;
};

export enum SportMatchArgNames {
  name = "name",
  sideA = "sideA",
  sideB = "sideB",

  flagA = "flagA",
  flagB = "flagB",

  scoreA = "scoreA",
  scoreB = "scoreB",

  sport = "sport",
  sportId = "sportId",

  type = "type",
  status = "status",
  sportRadar = "sportRadar",
  startTime = "startTime",
  endTime = "endTime",

  // soccer
  oddA = "oddA",
  oddDraw = "oddDraw",
  oddB = "oddB",
}

export enum SportMatchArgs {
  name = "name",

  sideA = "sideA",
  sideB = "sideB",

  flagA = "flagA",
  flagB = "flagB",

  scoreA = "scoreA",
  scoreB = "scoreB",

  sport = "sport",
  sportId = "sportId",

  type = "type",
  status = "status",
  sportRadar = "sportRadar",
  startTime = "startTime",
  endTime = "endTime",

  // soccer
  oddA = "oddA",
  oddDraw = "oddDraw",
  oddB = "oddB",
}

export interface SportMatch extends BaseModel {
  name?: string;

  sideA?: string;
  sideB?: string;

  flagA?: string;
  flagB?: string;

  scoreA?: number;
  scoreB?: number;

  sport?: string;
  sportId?: string;

  type?: SportMatchTypes;
  status?: SportMatchStatus;
  sportRadar?: string;
  startTime?: Date;
  endTime?: Date;

  // soccer
  oddA?: number;
  oddDraw?: number;
  oddB?: number;
}

export const SportMatchInitialValues: CreateSportMatchInput = {
  name: "",
};
