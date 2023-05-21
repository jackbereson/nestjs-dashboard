import React from "react";
import {
  BaseModelArgNames,
  BaseModelArgs,
} from "../../lib/models/base-model.model";
import {
  StakingInterest,
  StakingInterestArgNames,
  StakingInterestArgs,
} from "../../lib/modules/staking-interest/staking-interest.model";
import {
  ColumnData,
  ColumnTypes,
  DisplayMode,
  ViewModes,
} from "../../lib/models/page.model";
import StakingInterestActionDelete from "./staking-interest-action-delete";
import StakingInterestActionUpdate from "./staking-interest-action-update";
import TableView from "../../components-shared/table-view";
import ListView from "../../components-shared/list-view";

const columnData: ColumnData[] = [
  {
    name: StakingInterestArgNames.name,
    argument: StakingInterestArgs.name,
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
      data: StakingInterest;
      loadData: () => void;
    }) => (
      <>
        <StakingInterestActionUpdate data={data} loadData={loadData} />
        <StakingInterestActionDelete data={data} loadData={loadData} />
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
      data: StakingInterest;
      loadData: () => void;
    }) => (
      <>
        <StakingInterestActionUpdate data={data} loadData={loadData}  />
        <StakingInterestActionDelete data={data} loadData={loadData}  />
      </>
    ),
  },
];

const StakingInterestTableList = ({
  viewMode,
  data,
  loadData,
}: {
  viewMode: ViewModes;
  data: StakingInterest[];
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

export default StakingInterestTableList;
