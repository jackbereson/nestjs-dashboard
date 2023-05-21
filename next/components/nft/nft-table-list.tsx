import React from "react";
import { BaseModelArgNames, BaseModelArgs } from "../../lib/models/base-model.model";
import { Nft, NftArgNames, NftArgs } from "../../lib/modules/nft/nft.model";
import { ColumnData, ColumnTypes, DisplayMode, ViewModes } from "../../lib/models/page.model";
import NftActionDelete from "./nft-action-delete";
import NftActionUpdate from "./nft-action-update";
import TableView from "../../components-shared/table-view";
import ListView from "../../components-shared/list-view";

const columnData: ColumnData[] = [
  {
    name: NftArgNames.name,
    argument: NftArgs.name,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.string,
  },
  {
    name: NftArgNames.description,
    argument: NftArgs.description,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.string,
  },
  {
    name: NftArgNames.tokenId,
    argument: NftArgs.tokenId,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.string,
  },
  {
    name: NftArgNames.imageUrl,
    argument: NftArgs.imageUrl,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.image,
  },
  {
    name: "Metadata",
    type: ColumnTypes.custom,
    display: DisplayMode.TABLE_LISTVIEW,
    CustomHtml: ({ data }: { data: Nft }) => {
      return (
        <a href={`https://core.dc8.io/meta/details/${data.tokenId}`} target="_blank">
          https://core.dc8.io/meta/details/{data.tokenId}
        </a>
      );
    },
  },
  {
    name: NftArgNames.rareRate,
    argument: NftArgs.rareRate,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.string,
  },
  {
    name: NftArgNames.groupName,
    argument: NftArgs.groupName,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.string,
  },
  {
    name: NftArgNames.nftMintedStatus,
    argument: NftArgs.nftMintedStatus,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.string,
  },
  {
    name: NftArgNames.marketStatus,
    argument: NftArgs.marketStatus,
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
    CustomHtml: ({ data, loadData }: { data: Nft; loadData: () => void }) => (
      <>
        <NftActionUpdate data={data} loadData={loadData} />
        <NftActionDelete data={data} loadData={loadData} />
      </>
    ),
  },

  {
    name: "",
    type: ColumnTypes.custom,
    hideHeader: true,
    display: DisplayMode.LISTVIEW,
    isListViewFooter: true,
    CustomHtml: ({ data, loadData }: { data: Nft; loadData: () => void }) => (
      <>
        <NftActionUpdate data={data} loadData={loadData} />
        <NftActionDelete data={data} loadData={loadData} />
      </>
    ),
  },
];

const NftTableList = ({
  viewMode,
  data,
  loadData,
}: {
  viewMode: ViewModes;
  data: Nft[];
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

export default NftTableList;
