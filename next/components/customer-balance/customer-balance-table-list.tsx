import React from "react";
import { BaseModelArgNames, BaseModelArgs } from "../../lib/models/base-model.model";
import {
  CustomerBalance,
  CustomerBalanceArgNames,
  CustomerBalanceArgs,
} from "../../lib/modules/customer-balance/customer-balance.model";
import { ColumnData, ColumnTypes, DisplayMode, ViewModes } from "../../lib/models/page.model";
import CustomerBalanceActionDelete from "./customer-balance-action-delete";
import CustomerBalanceActionUpdate from "./customer-balance-action-update";
import TableView from "../../components-shared/table-view";
import ListView from "../../components-shared/list-view";

const columnData: ColumnData[] = [
  {
    name: CustomerBalanceArgNames.coin,
    argument: CustomerBalanceArgs.coin,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.string,
  },
  {
    name: CustomerBalanceArgNames.type,
    argument: CustomerBalanceArgs.type,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.string,
  },
  {
    name: CustomerBalanceArgNames.customerId,
    argument: CustomerBalanceArgs.customerId,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.string,
  },
  {
    name: CustomerBalanceArgNames.balance,
    argument: CustomerBalanceArgs.balance,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.string,
  },
  {
    name: CustomerBalanceArgNames.status,
    argument: CustomerBalanceArgs.status,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.string,
  },
  {
    name: CustomerBalanceArgNames.approved,
    argument: CustomerBalanceArgs.approved,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.boolean,
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
    CustomHtml: ({ data, loadData }: { data: CustomerBalance; loadData: () => void }) => (
      <>
        <CustomerBalanceActionUpdate data={data} loadData={loadData} />
        <CustomerBalanceActionDelete data={data} loadData={loadData} />
      </>
    ),
  },

  {
    name: "",
    type: ColumnTypes.custom,
    hideHeader: true,
    display: DisplayMode.LISTVIEW,
    isListViewFooter: true,
    CustomHtml: ({ data, loadData }: { data: CustomerBalance; loadData: () => void }) => (
      <>
        <CustomerBalanceActionUpdate data={data} loadData={loadData} />
        <CustomerBalanceActionDelete data={data} loadData={loadData} />
      </>
    ),
  },
];

const CustomerBalanceTableList = ({
  viewMode,
  data,
  loadData,
}: {
  viewMode: ViewModes;
  data: CustomerBalance[];
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

export default CustomerBalanceTableList;
