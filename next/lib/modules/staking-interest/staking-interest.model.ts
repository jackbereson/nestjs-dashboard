import { BaseModel } from "../../models/base-model.model";

export type CreateStakingInterestInput = {
    name?: string;
}

export type UpdateStakingInterestInput = {
    name?: string;
}

export enum StakingInterestArgNames {
    name = "Name",
}

export enum StakingInterestArgs {
    name = "name",
}

export interface StakingInterest extends BaseModel {
    name?: string;
}

export const StakingInterestInitialValues: CreateStakingInterestInput = {
    name: "",
}