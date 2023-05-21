import React from "react";
import { BaseModelArgNames, BaseModelArgs } from "../../lib/models/base-model.model";
import {
  SportMatch,
  SportMatchArgNames,
  SportMatchArgs,
} from "../../lib/modules/sport-match/sport-match.model";
import { ColumnData, ColumnTypes, DisplayMode, ViewModes } from "../../lib/models/page.model";
import SportMatchActionDelete from "./sport-match-action-delete";
import SportMatchActionUpdate from "./sport-match-action-update";
import TableView from "../../components-shared/table-view";
import ListView from "../../components-shared/list-view";

const columnData: ColumnData[] = [
  {
    name: SportMatchArgNames.name,
    argument: SportMatchArgs.name,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.string,
  },
  {
    name: SportMatchArgNames.sideA,
    argument: SportMatchArgs.sideA,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.string,
  },
  {
    name: SportMatchArgNames.sideB,
    argument: SportMatchArgs.sideB,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.string,
  },
  {
    name: SportMatchArgNames.scoreA,
    argument: SportMatchArgs.scoreA,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.string,
  },
  {
    name: SportMatchArgNames.scoreB,
    argument: SportMatchArgs.scoreB,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.string,
  },
  {
    name: SportMatchArgNames.scoreB,
    argument: SportMatchArgs.scoreB,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.string,
  },
  {
    name: SportMatchArgNames.sport,
    argument: SportMatchArgs.sport,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.string,
  },
  {
    name: SportMatchArgNames.type,
    argument: SportMatchArgs.type,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.string,
  },
  {
    name: SportMatchArgNames.status,
    argument: SportMatchArgs.status,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.string,
  },
  {
    name: SportMatchArgNames.startTime,
    argument: SportMatchArgs.startTime,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.datetime,
  },
  {
    name: SportMatchArgNames.endTime,
    argument: SportMatchArgs.endTime,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.datetime,
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
    CustomHtml: ({ data, loadData }: { data: SportMatch; loadData: () => void }) => (
      <>
        <SportMatchActionUpdate data={data} loadData={loadData} />
        <SportMatchActionDelete data={data} loadData={loadData} />
      </>
    ),
  },

  {
    name: "",
    type: ColumnTypes.custom,
    hideHeader: true,
    display: DisplayMode.LISTVIEW,
    isListViewFooter: true,
    CustomHtml: ({ data, loadData }: { data: SportMatch; loadData: () => void }) => (
      <>
        <SportMatchActionUpdate data={data} loadData={loadData} />
        <SportMatchActionDelete data={data} loadData={loadData} />
      </>
    ),
  },
];

const SportMatchTableList = ({
  viewMode,
  data,
  loadData,
}: {
  viewMode: ViewModes;
  data: SportMatch[];
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

export default SportMatchTableList;
