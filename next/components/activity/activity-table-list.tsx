import React from "react";
import { BaseModelArgNames, BaseModelArgs } from "../../lib/models/base-model.model";
import {
  Activity,
  ActivityArgNames,
  ActivityArgs,
} from "../../lib/modules/activity/activity.model";
import { ColumnData, ColumnTypes, DisplayMode, ViewModes } from "../../lib/models/page.model";
import ActivityActionDelete from "./activity-action-delete";
import TableView from "../../components-shared/table-view";
import ListView from "../../components-shared/list-view";

const columnData: ColumnData[] = [
  {
    name: ActivityArgNames.message,
    argument: ActivityArgs.message,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.string,
  },
  {
    name: ActivityArgNames.type,
    argument: ActivityArgs.type,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.string,
  },
  {
    name: ActivityArgNames.changedFactor,
    argument: ActivityArgs.changedFactor,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.string,
  },
  {
    name: ActivityArgNames.user,
    argument: ActivityArgs.user,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.custom,
    CustomHtml: ({ data }: { data: Activity }) => <>{data?.user?.email}</>,
  },
  {
    name: ActivityArgNames.customer,
    argument: ActivityArgs.customer,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.custom,
    CustomHtml: ({ data }: { data: Activity }) => <>{data?.customer?.address}</>,
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
];

const ActivityTableList = ({
  viewMode,
  data,
  loadData,
}: {
  viewMode: ViewModes;
  data: Activity[];
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

export default ActivityTableList;
