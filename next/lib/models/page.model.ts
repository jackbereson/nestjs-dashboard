export enum ColumnTypes {
  range = "range",
  string = "string",
  boolean = "boolean",
  type = "type",
  datetime = "datetime",
  date = "date",
  custom = "custom",
  link = "link",
  dayTime = "dayTime",
  image = "image",
}

export type TypeData = {
  code: string;
  name: string;
  className: string;
};

export enum DisplayMode {
  TABLE = "TABLE",
  LISTVIEW = "LISTVIEW",
  TABLE_LISTVIEW = "TABLE_LISTVIEW",
}

export type ColumnData = {
  name: string;
  thClassName?: string;
  tdClassName?: string;
  type: ColumnTypes;
  CustomHtml?: any;
  argument?: string;
  typeData?: TypeData[];
  hideHeader?: boolean;
  display?: DisplayMode;
  booleanText?: string[];
  isListViewFooter?: boolean;
};

export enum ViewModes {
  TABLE = "TABLE",
  LIST = "LIST",
}

export type PageConfigs = {
  code?: string;
  viewMode?: ViewModes;
};
