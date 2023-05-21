import { BaseModel } from "../../models/base-model.model";
import { MediaCategory } from "../media-category/media-category.model";

export type CreateMediaInput = {
  name?: string;
  url?: string;
};

export type UpdateMediaInput = {
  description?: string;
  mediaCategoryId?: string;
};

export enum MediaArgNames {
  name = "Name",
  slug = "Slug",
  url = "Url",
  description = "Description",
  type = "Type",
  mediaCategoryId = "Media Categories",
}

export enum MediaArgs {
  name = "name",
  slug = "slug",
  url = "url",
  description = "description",
  type = "type",
  mediaCategoryId = "mediaCategoryId",
}

export interface Media extends BaseModel {
  name?: string;
  slug?: string;
  url?: string;
  description?: string;
  type?: string;
  mediaCategoryId?: string;
  mediaCategory: MediaCategory
}

export const MediaInitialValues: CreateMediaInput = {
  name: "",
  url: "",
};
