import React from "react";
import { BaseModelArgNames, BaseModelArgs } from "../../lib/models/base-model.model";
import {
  Customer,
  CustomerArgNames,
  CustomerArgs,
} from "../../lib/modules/customer/customer.model";
import { ColumnData, ColumnTypes, DisplayMode, ViewModes } from "../../lib/models/page.model";
import CustomerActionDelete from "./customer-action-delete";
import CustomerActionUpdate from "./customer-action-update";
import TableView from "../../components-shared/table-view";
import ListView from "../../components-shared/list-view";
import { classNames } from "../../lib/helpers/design";
import NextIcon, { FCIcons } from "../../components-shared/next-icon";
import { Button } from "../../components-shared/shared/form/button";

const columnData: ColumnData[] = [
  {
    name: CustomerArgNames.address,
    argument: CustomerArgs.address,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.custom,
    CustomHtml: ({ data }: { data: Customer }) => {
      return <div className={classNames("text-10")}>{data?.address}</div>;
    },
  },
  {
    name: CustomerArgNames.id,
    argument: CustomerArgs.id,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.string,
  },
  {
    name: CustomerArgNames.isMiner,
    argument: CustomerArgs.isMiner,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.custom,
    CustomHtml: ({ data }: { data: Customer }) => {
      return (
        <>
          {data.isMiner ? (
            <Button onClick={()=>alert("aaaaa")}>
              <NextIcon className="text-2xl" name={FCIcons.FcCheckmark} />
            </Button>
          ) : (
            <Button onClick={()=>alert("aaaaa")}>
              <NextIcon className="text-2xl" name={FCIcons.FcCancel} />
            </Button>
          )}
        </>
      );
    },
  },

  {
    name: CustomerArgNames.addressIp,
    argument: CustomerArgs.addressIp,
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
    CustomHtml: ({ data, loadData }: { data: Customer; loadData: () => void }) => (
      <>
        <CustomerActionUpdate data={data} loadData={loadData} />
        <CustomerActionDelete data={data} loadData={loadData} />
      </>
    ),
  },

  {
    name: "",
    type: ColumnTypes.custom,
    hideHeader: true,
    display: DisplayMode.LISTVIEW,
    isListViewFooter: true,
    CustomHtml: ({ data, loadData }: { data: Customer; loadData: () => void }) => (
      <>
        <CustomerActionUpdate data={data} loadData={loadData} />
        <CustomerActionDelete data={data} loadData={loadData} />
      </>
    ),
  },
];

const CustomerTableList = ({
  viewMode,
  data,
  loadData,
}: {
  viewMode: ViewModes;
  data: Customer[];
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

export default CustomerTableList;
