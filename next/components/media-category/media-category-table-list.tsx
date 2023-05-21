import React from "react";
import {
  BaseModelArgNames,
  BaseModelArgs,
} from "../../lib/models/base-model.model";
import {
  MediaCategory,
  MediaCategoryArgNames,
  MediaCategoryArgs,
} from "../../lib/modules/media-category/media-category.model";
import {
  ColumnData,
  ColumnTypes,
  DisplayMode,
  ViewModes,
} from "../../lib/models/page.model";
import MediaCategoryActionDelete from "./media-category-action-delete";
import MediaCategoryActionUpdate from "./media-category-action-update";
import TableView from "../../components-shared/table-view";
import ListView from "../../components-shared/list-view";

const columnData: ColumnData[] = [
  {
    name: MediaCategoryArgNames.name,
    argument: MediaCategoryArgs.name,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.string,
  },
  {
    name: BaseModelArgNames.createdAt,
    argument: BaseModelArgs.createdAt,
    type: ColumnTypes.datetime,
    display: DisplayMode.TABLE_LISTVIEW,
  },
  {
    name: BaseModelArgNames.updatedAt,
    argument: BaseModelArgs.updatedAt,
    type: ColumnTypes.datetime,
    display: DisplayMode.TABLE_LISTVIEW,
  },
  {
    name: "",
    type: ColumnTypes.custom,
    hideHeader: true,
    display: DisplayMode.TABLE,
    CustomHtml: ({
      data,
      loadData,
    }: {
      data: MediaCategory;
      loadData: () => void;
    }) => (
      <>
        <MediaCategoryActionUpdate data={data} loadData={loadData} />
        <MediaCategoryActionDelete data={data} loadData={loadData} />
      </>
    ),
  },

  {
    name: "",
    type: ColumnTypes.custom,
    hideHeader: true,
    display: DisplayMode.LISTVIEW,
    isListViewFooter: true,
    CustomHtml: ({
      data,
      loadData,
    }: {
      data: MediaCategory;
      loadData: () => void;
    }) => (
      <>
        <MediaCategoryActionUpdate data={data} loadData={loadData}  />
        <MediaCategoryActionDelete data={data} loadData={loadData}  />
      </>
    ),
  },
];

const MediaCategoryTableList = ({
  viewMode,
  data,
  loadData,
}: {
  viewMode: ViewModes;
  data: MediaCategory[];
  loadData?: () => void;
}) => {
  return (
    <>
      {viewMode === ViewModes.TABLE && (
        <TableView columnData={columnData} data={data} loadData={loadData} />
      )}
      {viewMode === ViewModes.LIST && (
        <ListView columnData={columnData} data={data} loadData={loadData} />
      )}
    </>
  );
};

export default MediaCategoryTableList;
