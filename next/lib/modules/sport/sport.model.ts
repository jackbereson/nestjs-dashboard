import { BaseModel } from "../../models/base-model.model";

export type CreateSportInput = {
    name?: string;
}

export type UpdateSportInput = {
    name?: string;
}

export enum SportArgNames {
    name = "Name",
}

export enum SportArgs {
    name = "name",
}

export interface Sport extends BaseModel {
    name?: string;
}

export const SportInitialValues: CreateSportInput = {
    name: "",
}