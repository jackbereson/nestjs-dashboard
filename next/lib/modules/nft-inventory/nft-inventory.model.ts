import { BaseModel } from "../../models/base-model.model";

export type CreateNftInventoryInput = {
    name?: string;
}

export type UpdateNftInventoryInput = {
    name?: string;
}

export enum NftInventoryArgNames {
    name = "Name",
}

export enum NftInventoryArgs {
    name = "name",
}

export interface NftInventory extends BaseModel {
    name?: string;
}

export const NftInventoryInitialValues: CreateNftInventoryInput = {
    name: "",
}