import React from "react";
import {
  BaseModelArgNames,
  BaseModelArgs,
} from "../../lib/models/base-model.model";
import {
  NftLauchpadPackage,
  NftLauchpadPackageArgNames,
  NftLauchpadPackageArgs,
} from "../../lib/modules/nft-lauchpad-package/nft-lauchpad-package.model";
import {
  ColumnData,
  ColumnTypes,
  DisplayMode,
  ViewModes,
} from "../../lib/models/page.model";
import NftLauchpadPackageActionDelete from "./nft-lauchpad-package-action-delete";
import NftLauchpadPackageActionUpdate from "./nft-lauchpad-package-action-update";
import TableView from "../../components-shared/table-view";
import ListView from "../../components-shared/list-view";

const columnData: ColumnData[] = [
  {
    name: NftLauchpadPackageArgNames.name,
    argument: NftLauchpadPackageArgs.name,
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
      data: NftLauchpadPackage;
      loadData: () => void;
    }) => (
      <>
        <NftLauchpadPackageActionUpdate data={data} loadData={loadData} />
        <NftLauchpadPackageActionDelete data={data} loadData={loadData} />
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
      data: NftLauchpadPackage;
      loadData: () => void;
    }) => (
      <>
        <NftLauchpadPackageActionUpdate data={data} loadData={loadData}  />
        <NftLauchpadPackageActionDelete data={data} loadData={loadData}  />
      </>
    ),
  },
];

const NftLauchpadPackageTableList = ({
  viewMode,
  data,
  loadData,
}: {
  viewMode: ViewModes;
  data: NftLauchpadPackage[];
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

export default NftLauchpadPackageTableList;
