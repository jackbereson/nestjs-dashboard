import React from "react";
import { BaseModelArgNames, BaseModelArgs } from "../../lib/models/base-model.model";
import { Media, MediaArgNames, MediaArgs } from "../../lib/modules/media/media.model";
import { ColumnData, ColumnTypes, DisplayMode, ViewModes } from "../../lib/models/page.model";
import MediaActionDelete from "./media-action-delete";
import MediaActionUpdate from "./media-action-update";
import TableView from "../../components-shared/table-view";
import ListView from "../../components-shared/list-view";

const columnData: ColumnData[] = [
  {
    name: MediaArgNames.name,
    argument: MediaArgs.name,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.string,
  },
  {
    name: MediaArgNames.url,
    argument: MediaArgs.url,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.link,
  },
  {
    name: MediaArgNames.url,
    argument: MediaArgs.url,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.image,
  },
  {
    name: MediaArgNames.slug,
    argument: MediaArgs.slug,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.string,
  },
  {
    name: MediaArgNames.type,
    argument: MediaArgs.type,
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
    CustomHtml: ({ data, loadData }: { data: Media; loadData: () => void }) => (
      <>
        <MediaActionUpdate data={data} loadData={loadData} />
        <MediaActionDelete data={data} loadData={loadData} />
      </>
    ),
  },

  {
    name: "",
    type: ColumnTypes.custom,
    hideHeader: true,
    display: DisplayMode.LISTVIEW,
    isListViewFooter: true,
    CustomHtml: ({ data, loadData }: { data: Media; loadData: () => void }) => (
      <>
        <MediaActionUpdate data={data} loadData={loadData} />
        <MediaActionDelete data={data} loadData={loadData} />
      </>
    ),
  },
];

const MediaTableList = ({
  viewMode,
  data,
  loadData,
}: {
  viewMode?: ViewModes;
  data: Media[];
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

export default MediaTableList;
