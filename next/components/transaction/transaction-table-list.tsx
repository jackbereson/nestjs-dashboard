import React from "react";
import { BaseModelArgNames, BaseModelArgs } from "../../lib/models/base-model.model";
import {
  Transaction,
  TransactionArgNames,
  TransactionArgs,
} from "../../lib/modules/transaction/transaction.model";
import { ColumnData, ColumnTypes, DisplayMode, ViewModes } from "../../lib/models/page.model";
import TransactionActionDelete from "./transaction-action-delete";
import TransactionActionUpdate from "./transaction-action-update";
import TableView from "../../components-shared/table-view";
import ListView from "../../components-shared/list-view";
import useAuth from "../../hooks/use-auth";
import { UserRole } from "../../lib/modules/user/user.model";

const TransactionTableList = ({
  viewMode,
  data,
  loadData,
}: {
  viewMode: ViewModes;
  data: Transaction[];
  loadData?: () => void;
}) => {
  const user = useAuth();

  const adminActions = [
    {
      name: "",
      type: ColumnTypes.custom,
      hideHeader: true,
      display: DisplayMode.TABLE,
      CustomHtml: ({ data, loadData }: { data: Transaction; loadData: () => void }) => (
        <>
          <TransactionActionUpdate data={data} loadData={loadData} />
          <TransactionActionDelete data={data} loadData={loadData} />
        </>
      ),
    },

    {
      name: "",
      type: ColumnTypes.custom,
      hideHeader: true,
      display: DisplayMode.LISTVIEW,
      isListViewFooter: true,
      CustomHtml: ({ data, loadData }: { data: Transaction; loadData: () => void }) => (
        <>
          <TransactionActionUpdate data={data} loadData={loadData} />
          <TransactionActionDelete data={data} loadData={loadData} />
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
      CustomHtml: ({ data, loadData }: { data: Transaction; loadData: () => void }) => (
        <>
          <TransactionActionUpdate data={data} loadData={loadData} />
        </>
      ),
    },

    {
      name: "",
      type: ColumnTypes.custom,
      hideHeader: true,
      display: DisplayMode.LISTVIEW,
      isListViewFooter: true,
      CustomHtml: ({ data, loadData }: { data: Transaction; loadData: () => void }) => (
        <>
          <TransactionActionUpdate data={data} loadData={loadData} />
        </>
      ),
    },
  ];

  const columnData: ColumnData[] = [
    {
      name: TransactionArgNames.transactionHash,
      argument: TransactionArgs.transactionHash,
      display: DisplayMode.TABLE_LISTVIEW,
      type: ColumnTypes.string,
    },
    {
      name: TransactionArgNames.blockNumber,
      argument: TransactionArgs.blockNumber,
      display: DisplayMode.TABLE_LISTVIEW,
      type: ColumnTypes.string,
    },
    {
      name: TransactionArgNames.fromAddress,
      argument: TransactionArgs.fromAddress,
      display: DisplayMode.TABLE_LISTVIEW,
      type: ColumnTypes.string,
    },
    {
      name: TransactionArgNames.toAddress,
      argument: TransactionArgs.toAddress,
      display: DisplayMode.TABLE_LISTVIEW,
      type: ColumnTypes.string,
    },
    {
      name: TransactionArgNames.fromCustomerId,
      argument: TransactionArgs.fromCustomerId,
      display: DisplayMode.TABLE_LISTVIEW,
      type: ColumnTypes.string,
    },
    {
      name: TransactionArgNames.toCustomerId,
      argument: TransactionArgs.toCustomerId,
      display: DisplayMode.TABLE_LISTVIEW,
      type: ColumnTypes.string,
    },
    {
      name: TransactionArgNames.price,
      argument: TransactionArgs.price,
      display: DisplayMode.TABLE_LISTVIEW,
      type: ColumnTypes.string,
    },
    {
      name: TransactionArgNames.value,
      argument: TransactionArgs.value,
      display: DisplayMode.TABLE_LISTVIEW,
      type: ColumnTypes.string,
    },
    {
      name: TransactionArgNames.event,
      argument: TransactionArgs.event,
      display: DisplayMode.TABLE_LISTVIEW,
      type: ColumnTypes.string,
    },
    {
      name: TransactionArgNames.status,
      argument: TransactionArgs.status,
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

export default TransactionTableList;
