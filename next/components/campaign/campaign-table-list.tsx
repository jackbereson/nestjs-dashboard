import React from "react";
import { BaseModelArgNames, BaseModelArgs } from "../../lib/models/base-model.model";
import {
  Campaign,
  CampaignArgNames,
  CampaignArgs,
} from "../../lib/modules/campaign/campaign.model";
import { ColumnData, ColumnTypes, DisplayMode, ViewModes } from "../../lib/models/page.model";
import CampaignActionDelete from "./campaign-action-delete";
import CampaignActionUpdate from "./campaign-action-update";
import TableView from "../../components-shared/table-view";
import ListView from "../../components-shared/list-view";
import useAuth from "../../hooks/use-auth";
import { UserRole } from "../../lib/modules/user/user.model";

const CampaignTableList = ({
  viewMode,
  data,
  loadData,
}: {
  viewMode: ViewModes;
  data: Campaign[];
  loadData?: () => void;
}) => {
  const user = useAuth();

  const adminActions = [
    {
      name: "",
      type: ColumnTypes.custom,
      hideHeader: true,
      display: DisplayMode.TABLE,
      CustomHtml: ({ data, loadData }: { data: Campaign; loadData: () => void }) => (
        <>
          <CampaignActionUpdate data={data} loadData={loadData} />
          <CampaignActionDelete data={data} loadData={loadData} />
        </>
      ),
    },

    {
      name: "",
      type: ColumnTypes.custom,
      hideHeader: true,
      display: DisplayMode.LISTVIEW,
      isListViewFooter: true,
      CustomHtml: ({ data, loadData }: { data: Campaign; loadData: () => void }) => (
        <>
          <CampaignActionUpdate data={data} loadData={loadData} />
          <CampaignActionDelete data={data} loadData={loadData} />
        </>
      ),
    },
  ];

  const editorActions = [
    {
      name: "",
      type: ColumnTypes.custom,
      hideHeader: true,
      display: DisplayMode.TABLE,
      CustomHtml: ({ data, loadData }: { data: Campaign; loadData: () => void }) => (
        <>
          <CampaignActionUpdate data={data} loadData={loadData} />
        </>
      ),
    },

    {
      name: "",
      type: ColumnTypes.custom,
      hideHeader: true,
      display: DisplayMode.LISTVIEW,
      isListViewFooter: true,
      CustomHtml: ({ data, loadData }: { data: Campaign; loadData: () => void }) => (
        <>
          <CampaignActionUpdate data={data} loadData={loadData} />
        </>
      ),
    },
  ];

  const columnData: ColumnData[] = [
    {
      name: CampaignArgNames.name,
      argument: CampaignArgs.name,
      display: DisplayMode.TABLE_LISTVIEW,
      type: ColumnTypes.string,
    },
    {
      name: CampaignArgNames.startDate,
      argument: CampaignArgs.startDate,
      display: DisplayMode.TABLE_LISTVIEW,
      type: ColumnTypes.datetime,
    },
    {
      name: CampaignArgNames.endDate,
      argument: CampaignArgs.endDate,
      display: DisplayMode.TABLE_LISTVIEW,
      type: ColumnTypes.datetime,
    },
    {
      name: CampaignArgNames.ratioBNB,
      argument: CampaignArgs.ratioBNB,
      display: DisplayMode.TABLE_LISTVIEW,
      type: ColumnTypes.string,
    },
    {
      name: CampaignArgNames.maxTokenLimit,
      argument: CampaignArgs.maxTokenLimit,
      display: DisplayMode.TABLE_LISTVIEW,
      type: ColumnTypes.string,
    },
    {
      name: CampaignArgNames.totalTokenAmount,
      argument: CampaignArgs.totalTokenAmount,
      display: DisplayMode.TABLE_LISTVIEW,
      type: ColumnTypes.string,
    },
    {
      name: CampaignArgNames.is100PercentProgress,
      argument: CampaignArgs.is100PercentProgress,
      display: DisplayMode.TABLE_LISTVIEW,
      type: ColumnTypes.boolean,
    },
    {
      name: CampaignArgNames.status,
      argument: CampaignArgs.status,
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
    ...(user?.role === UserRole.ADMIN ? adminActions : editorActions),
  ];

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

export default CampaignTableList;
