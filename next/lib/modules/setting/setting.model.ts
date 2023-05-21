
import { type } from "jquery";
import { BaseModel } from "../../models/base-model.model";
import { SettingGroup } from "../setting-group/setting-group.model";

export enum SettingType {
    string = "string",
    number = "number",
    array = "array",
    object = "object",
    richText = "richText",
    boolean = "boolean",
    json = "json"
}

export enum EditMode {
    SYSTEM = "SYSTEM",
    USER = "USER"
}

export const settingTypeData = [
    { name: SettingType.string, value: SettingType.string },
    { name: SettingType.number, value: SettingType.number },
    { name: SettingType.array, value: SettingType.array },
    { name: SettingType.object, value: SettingType.object },
    { name: SettingType.richText, value: SettingType.richText },
    { name: SettingType.boolean, value: SettingType.boolean },
    { name: SettingType.json, value: SettingType.json },
];

export interface Setting extends BaseModel {
    type?: SettingType;
    name?: string;
    key?: string;
    value?: any;
    editMode?: EditMode;
    isActive?: boolean;
    isPrivate?: boolean;
    readOnly?: boolean;
    groupId?: string;
    group?: SettingGroup;
}

export enum SettingArgNames {
    name = "Name",
    type = "Type",
    key = "Key",
    value = "Value",
    isActive = "Is active",
    isPrivate = "Is private",
    readOnly = "Read only",
    groupId = "Group id",
    group = "Group",
}

export enum SettingArgs {
    name = "name",
    type = "type",
    key = "key",
    value = "value",
    isActive = "isActive",
    isPrivate = "isPrivate",
    readOnly = "readOnly",
    groupId = "groupId",
    group = "group",
}


export type CreateSettingInput = {
    type?: SettingType;
    name?: string;
    key?: string;
    value?: any;
    isActive?: boolean;
    isPrivate?: boolean;
    readOnly?: boolean;
    groupId?: string;
}

export type UpdateSettingInput = {
    type: SettingType;
    name: string;
    key: string;
    value: any;
    isActive: boolean;
    isPrivate: boolean;
}