import { BaseModel } from "../../models/base-model.model";

export type CreateMediaCategoryInput = {
  name?: string;
};

export type UpdateMediaCategoryInput = {
  name?: string;
};

export enum MediaCategoryArgNames {
  name = "Name",
}

export enum MediaCategoryArgs {
  name = "name",
}

export interface MediaCategory extends BaseModel {
  name?: string;
}

export const MediaCategoryInitialValues: CreateMediaCategoryInput = {
  name: "",
};
