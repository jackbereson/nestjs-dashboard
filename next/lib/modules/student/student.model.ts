import { BaseModel } from "../../models/base-model.model";

export type CreateStudentInput = {
    name?: string;
}

export type UpdateStudentInput = {
    name?: string;
}

export enum StudentArgNames {
    name = "Name",
}

export enum StudentArgs {
    name = "name",
}

export interface Student extends BaseModel {
    name?: string;
}

export const StudentInitialValues: CreateStudentInput = {
    name: "",
}