import React from "react";
import { BaseModelArgNames, BaseModelArgs } from "../../lib/models/base-model.model";
import {
  SportBet,
  SportBetArgNames,
  SportBetArgs,
} from "../../lib/modules/sport-bet/sport-bet.model";
import { ColumnData, ColumnTypes, DisplayMode, ViewModes } from "../../lib/models/page.model";
import SportBetActionDelete from "./sport-bet-action-delete";
import SportBetActionUpdate from "./sport-bet-action-update";
import TableView from "../../components-shared/table-view";
import ListView from "../../components-shared/list-view";

const columnData: ColumnData[] = [
  {
    name: SportBetArgNames.name,
    argument: SportBetArgs.name,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.string,
  },
  {
    name: SportBetArgNames.betSide,
    argument: SportBetArgs.betSide,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.string,
  },
  {
    name: SportBetArgNames.winSide,
    argument: SportBetArgs.winSide,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.string,
  },
  {
    name: SportBetArgNames.odd,
    argument: SportBetArgs.odd,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.string,
  },
  {
    name: SportBetArgNames.odd,
    argument: SportBetArgs.odd,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.string,
  },
  {
    name: SportBetArgNames.betAmount,
    argument: SportBetArgs.betAmount,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.string,
  },
  {
    name: SportBetArgNames.winAmount,
    argument: SportBetArgs.winAmount,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.string,
  },
  {
    name: SportBetArgNames.coin,
    argument: SportBetArgs.coin,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.string,
  },
  {
    name: SportBetArgNames.isWin,
    argument: SportBetArgs.isWin,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.boolean,
  },
  {
    name: SportBetArgNames.sport,
    argument: SportBetArgs.sport,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.string,
  },
  {
    name: SportBetArgNames.customerId,
    argument: SportBetArgs.customerId,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.string,
  },
  {
    name: SportBetArgNames.status,
    argument: SportBetArgs.status,
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
    CustomHtml: ({ data, loadData }: { data: SportBet; loadData: () => void }) => (
      <>
        <SportBetActionUpdate data={data} loadData={loadData} />
        <SportBetActionDelete data={data} loadData={loadData} />
      </>
    ),
  },

  {
    name: "",
    type: ColumnTypes.custom,
    hideHeader: true,
    display: DisplayMode.LISTVIEW,
    isListViewFooter: true,
    CustomHtml: ({ data, loadData }: { data: SportBet; loadData: () => void }) => (
      <>
        <SportBetActionUpdate data={data} loadData={loadData} />
        <SportBetActionDelete data={data} loadData={loadData} />
      </>
    ),
  },
];

const SportBetTableList = ({
  viewMode,
  data,
  loadData,
}: {
  viewMode: ViewModes;
  data: SportBet[];
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

export default SportBetTableList;
