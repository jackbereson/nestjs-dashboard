import { BaseModel } from "../../models/base-model.model";
import { Setting } from "../setting/setting.model";


export enum SettingGroupArgNames {
    slug = "Slug",
    name = "Name",
    icon = "Icon",
    desc = "Description",
    readOnly = "Read only",
}

export enum SettingGroupArgs {
    slug = "slug",
    name = "name",
    icon = "icon",
    desc = "desc",
    readOnly = "readOnly",
}


export interface SettingGroup extends BaseModel {
    slug?: string;
    name?: string;
    desc?: string;
    icon?: string;
    readOnly?: boolean;
    settings?: Setting[];
}

export type CreateSettingGroupInput = {
    slug?: string;
    name?: string;
    desc?: string;
    icon?: string;
    readOnly?: boolean;
}

export type UpdateSettingGroupInput = {
    name?: string;
    desc?: string;
    icon?: string;
    readOnly?: boolean;
}