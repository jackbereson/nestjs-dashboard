import React from "react";
import {
  BaseModelArgNames,
  BaseModelArgs,
} from "../../lib/models/base-model.model";
import {
  BalanceTransaction,
  BalanceTransactionArgNames,
  BalanceTransactionArgs,
} from "../../lib/modules/balance-transaction/balance-transaction.model";
import {
  ColumnData,
  ColumnTypes,
  DisplayMode,
  ViewModes,
} from "../../lib/models/page.model";
import BalanceTransactionActionDelete from "./balance-transaction-action-delete";
import BalanceTransactionActionUpdate from "./balance-transaction-action-update";
import TableView from "../../components-shared/table-view";
import ListView from "../../components-shared/list-view";

const columnData: ColumnData[] = [
  {
    name: BalanceTransactionArgNames.coin,
    argument: BalanceTransactionArgs.coin,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.string,
  },
  {
    name: BalanceTransactionArgNames.value,
    argument: BalanceTransactionArgs.value,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.string,
  },
  {
    name: BalanceTransactionArgNames.fromBalanceType,
    argument: BalanceTransactionArgs.fromBalanceType,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.string,
  },
  {
    name: BalanceTransactionArgNames.fromBalanceId,
    argument: BalanceTransactionArgs.fromBalanceId,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.string,
  },
  {
    name: BalanceTransactionArgNames.toBalanceType,
    argument: BalanceTransactionArgs.toBalanceType,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.string,
  },
  {
    name: BalanceTransactionArgNames.toBalanceId,
    argument: BalanceTransactionArgs.toBalanceId,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.string,
  },
  {
    name: BalanceTransactionArgNames.status,
    argument: BalanceTransactionArgs.status,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.string,
  },
  {
    name: BalanceTransactionArgNames.event,
    argument: BalanceTransactionArgs.event,
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
      data: BalanceTransaction;
      loadData: () => void;
    }) => (
      <>
        <BalanceTransactionActionUpdate data={data} loadData={loadData} />
        <BalanceTransactionActionDelete data={data} loadData={loadData} />
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
      data: BalanceTransaction;
      loadData: () => void;
    }) => (
      <>
        <BalanceTransactionActionUpdate data={data} loadData={loadData}  />
        <BalanceTransactionActionDelete data={data} loadData={loadData}  />
      </>
    ),
  },
];

const BalanceTransactionTableList = ({
  viewMode,
  data,
  loadData,
}: {
  viewMode: ViewModes;
  data: BalanceTransaction[];
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

export default BalanceTransactionTableList;
