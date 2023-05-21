import React from "react";
import {
  BaseModelArgNames,
  BaseModelArgs,
} from "../../lib/models/base-model.model";
import {
  NftLaunchpad,
  NftLaunchpadArgNames,
  NftLaunchpadArgs,
} from "../../lib/modules/nft-launchpad/nft-launchpad.model";
import {
  ColumnData,
  ColumnTypes,
  DisplayMode,
  ViewModes,
} from "../../lib/models/page.model";
import NftLaunchpadActionDelete from "./nft-launchpad-action-delete";
import NftLaunchpadActionUpdate from "./nft-launchpad-action-update";
import TableView from "../../components-shared/table-view";
import ListView from "../../components-shared/list-view";

const columnData: ColumnData[] = [
  {
    name: NftLaunchpadArgNames.name,
    argument: NftLaunchpadArgs.name,
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
      data: NftLaunchpad;
      loadData: () => void;
    }) => (
      <>
        <NftLaunchpadActionUpdate data={data} loadData={loadData} />
        <NftLaunchpadActionDelete data={data} loadData={loadData} />
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
      data: NftLaunchpad;
      loadData: () => void;
    }) => (
      <>
        <NftLaunchpadActionUpdate data={data} loadData={loadData}  />
        <NftLaunchpadActionDelete data={data} loadData={loadData}  />
      </>
    ),
  },
];

const NftLaunchpadTableList = ({
  viewMode,
  data,
  loadData,
}: {
  viewMode: ViewModes;
  data: NftLaunchpad[];
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

export default NftLaunchpadTableList;
