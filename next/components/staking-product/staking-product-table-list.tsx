import React from "react";
import {
  BaseModelArgNames,
  BaseModelArgs,
} from "../../lib/models/base-model.model";
import {
  StakingProduct,
  StakingProductArgNames,
  StakingProductArgs,
} from "../../lib/modules/staking-product/staking-product.model";
import {
  ColumnData,
  ColumnTypes,
  DisplayMode,
  ViewModes,
} from "../../lib/models/page.model";
import StakingProductActionDelete from "./staking-product-action-delete";
import StakingProductActionUpdate from "./staking-product-action-update";
import TableView from "../../components-shared/table-view";
import ListView from "../../components-shared/list-view";

const columnData: ColumnData[] = [
  {
    name: StakingProductArgNames.name,
    argument: StakingProductArgs.name,
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
      data: StakingProduct;
      loadData: () => void;
    }) => (
      <>
        <StakingProductActionUpdate data={data} loadData={loadData} />
        <StakingProductActionDelete data={data} loadData={loadData} />
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
      data: StakingProduct;
      loadData: () => void;
    }) => (
      <>
        <StakingProductActionUpdate data={data} loadData={loadData}  />
        <StakingProductActionDelete data={data} loadData={loadData}  />
      </>
    ),
  },
];

const StakingProductTableList = ({
  viewMode,
  data,
  loadData,
}: {
  viewMode: ViewModes;
  data: StakingProduct[];
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

export default StakingProductTableList;
