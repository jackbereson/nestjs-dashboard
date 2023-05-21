export interface Pagination {
    limit?: number;
    offset?: number;
    page?: number;
    total?: number;
}

export class QueryInput<T> {
    limit?: number;
    page?: number;
    offset?: number;
    search?: string;
    order?: any;
    filter?: any;
}

export interface GetListData<T> {
    data: T[];
    total: number;
    pagination: Pagination;
}

export interface BaseModel {
    id?: string;
    updatedAt?: string;
    createdAt?: string;
    [x: string]: any;
}

export enum BaseModelArgNames {
    id = "Id",
    updatedAt = "Updated At",
    createdAt = "Created At",
}

export enum BaseModelArgs {
    id = "id",
    updatedAt = "updatedAt",
    createdAt = "createdAt",
}

