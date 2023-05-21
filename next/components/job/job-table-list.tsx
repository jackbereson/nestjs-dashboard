import React from "react";
import { AgendaJob } from "../../lib/modules/agenda/agenda-job.model";
import {
  ColumnData,
  ColumnTypes,
  DisplayMode,
  ViewModes,
} from "../../lib/models/page.model";
import JobActionDelete from "./job-action-delete";
import JobActionUpdate from "./job-action-update";
import TableView from "../../components-shared/table-view";
import ListView from "../../components-shared/list-view";
import TableDropdown from "../../components-shared/dropdowns/table-dropdown";

const columnData: ColumnData[] = [
  {
    name: "Name",
    type: ColumnTypes.string,
    argument: "name",
    display: DisplayMode.TABLE_LISTVIEW,
  },
  {
    name: "Type",
    type: ColumnTypes.string,
    argument: "type",
    display: DisplayMode.TABLE_LISTVIEW,
  },
  {
    name: "Priority",
    type: ColumnTypes.string,
    argument: "priority",
    display: DisplayMode.TABLE_LISTVIEW,
  },
  {
    name: "Next run at",
    type: ColumnTypes.datetime,
    argument: "nextRunAt",
    display: DisplayMode.TABLE_LISTVIEW,
  },
  {
    name: "EditBy",
    type: ColumnTypes.custom,
    display: DisplayMode.TABLE_LISTVIEW,
    CustomHtml: ({ data }: { data: AgendaJob }) => {
      return (
        <div className="flex items-center justify-start">
          <span className="ml-3 font-bold text-gray-600">
            Contact : {data.lastModifiedByUser?.email || "..."} -{" "}
            {data.lastModifiedByUser?.phone || "..."} <br />
            Name : {data.lastModifiedByUser?.name || "..."}
          </span>
        </div>
      );
    },
  },
  {
    name: "LockedAt",
    type: ColumnTypes.datetime,
    display: DisplayMode.TABLE_LISTVIEW,
    argument: "lockedAt",
  },
  {
    name: "LastRunAt",
    type: ColumnTypes.datetime,
    display: DisplayMode.TABLE_LISTVIEW,
    argument: "lastRunAt",
  },
  {
    name: "FinishedAt",
    type: ColumnTypes.datetime,
    argument: "lastFinishedAt",
    display: DisplayMode.TABLE_LISTVIEW,
  },
  {
    name: "Disabled",
    type: ColumnTypes.boolean,
    argument: "disabled",
    display: DisplayMode.TABLE_LISTVIEW,
  },
  {
    name: "FailCount",
    type: ColumnTypes.string,
    argument: "failCount",
    display: DisplayMode.TABLE_LISTVIEW,
  },
  {
    name: "FailedAt",
    type: ColumnTypes.datetime,
    argument: "failedAt",
    display: DisplayMode.TABLE_LISTVIEW,
  },
  {
    name: "Reason",
    type: ColumnTypes.string,
    argument: "failReason",
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
      data: AgendaJob;
      loadData: () => void;
    }) => (
      <TableDropdown
        actions={[
          { Act: () => <JobActionUpdate data={data} loadData={loadData} /> },
          { Act: () => <JobActionDelete data={data} loadData={loadData} /> },
        ]}
      />
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
      data: AgendaJob;
      loadData: () => void;
    }) => (
      <>
        <JobActionUpdate data={data} loadData={loadData} />
        <JobActionDelete data={data} loadData={loadData} />
      </>
    ),
  },
];

const JobTableList = ({
  viewMode,
  data,
  loadData,
}: {
  viewMode: ViewModes;
  data: AgendaJob[];
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

export default JobTableList;
