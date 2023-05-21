import { BaseModel } from "../../models/base-model.model";

export type CreateStakingProductInput = {
    name?: string;
}

export type UpdateStakingProductInput = {
    name?: string;
}

export enum StakingProductArgNames {
    name = "Name",
}

export enum StakingProductArgs {
    name = "name",
}

export interface StakingProduct extends BaseModel {
    name?: string;
}

export const StakingProductInitialValues: CreateStakingProductInput = {
    name: "",
}