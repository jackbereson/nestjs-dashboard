import React from "react";
import {
  BaseModelArgNames,
  BaseModelArgs,
} from "../../lib/models/base-model.model";
import {
  SeedSaleEarn,
  SeedSaleEarnArgNames,
  SeedSaleEarnArgs,
} from "../../lib/modules/seed-sale-earn/seed-sale-earn.model";
import {
  ColumnData,
  ColumnTypes,
  DisplayMode,
  ViewModes,
} from "../../lib/models/page.model";
import SeedSaleEarnActionDelete from "./seed-sale-earn-action-delete";
import SeedSaleEarnActionUpdate from "./seed-sale-earn-action-update";
import TableView from "../../components-shared/table-view";
import ListView from "../../components-shared/list-view";

const columnData: ColumnData[] = [
  {
    name: SeedSaleEarnArgNames.name,
    argument: SeedSaleEarnArgs.name,
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
      data: SeedSaleEarn;
      loadData: () => void;
    }) => (
      <>
        <SeedSaleEarnActionUpdate data={data} loadData={loadData} />
        <SeedSaleEarnActionDelete data={data} loadData={loadData} />
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
      data: SeedSaleEarn;
      loadData: () => void;
    }) => (
      <>
        <SeedSaleEarnActionUpdate data={data} loadData={loadData}  />
        <SeedSaleEarnActionDelete data={data} loadData={loadData}  />
      </>
    ),
  },
];

const SeedSaleEarnTableList = ({
  viewMode,
  data,
  loadData,
}: {
  viewMode: ViewModes;
  data: SeedSaleEarn[];
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

export default SeedSaleEarnTableList;
