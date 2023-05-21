import { BaseModel } from "../../models/base-model.model";

export type CreateSeedSaleEarnInput = {
    name?: string;
}

export type UpdateSeedSaleEarnInput = {
    name?: string;
}

export enum SeedSaleEarnArgNames {
    name = "Name",
}

export enum SeedSaleEarnArgs {
    name = "name",
}

export interface SeedSaleEarn extends BaseModel {
    name?: string;
}

export const SeedSaleEarnInitialValues: CreateSeedSaleEarnInput = {
    name: "",
}