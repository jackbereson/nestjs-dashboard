import React from "react";
import TableDropdown from "../../components-shared/dropdowns/table-dropdown";
import ListView from "../../components-shared/list-view";
import TableView from "../../components-shared/table-view";
import { ColumnData, ColumnTypes, DisplayMode, ViewModes } from "../../lib/models/page.model";
import { User, UserServiceStatus, UserStatus } from "../../lib/modules/user/user.model";
import UserActionDelete from "./user-action-delete";
import UserActionUpdate from "./user-action-update";

const columnData: ColumnData[] = [
  {
    name: "Name",
    argument: "name",
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.string,
  },
  {
    name: "Email",
    argument: "email",
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.string,
  },
  {
    name: "Role",
    argument: "role",
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.string,
  },
  {
    name: "Status",
    argument: "status",
    type: ColumnTypes.type,
    display: DisplayMode.TABLE_LISTVIEW,
    typeData: [
      {
        code: UserStatus.ACTIVE,
        name: "Active",
        className: "bg-green-600 text-white text-sm", //text-green-500 mr-2",
      },
      {
        code: UserStatus.DEACTIVE,
        name: "Deactive",
        className: "bg-red-700 text-white text-sm", //text-red-500 mr-2",
      },
    ],
  },
  {
    name: "Created at",
    type: ColumnTypes.datetime,
    display: DisplayMode.TABLE_LISTVIEW,
    argument: "createdAt",
  },
  {
    name: "Updated at",
    type: ColumnTypes.datetime,
    display: DisplayMode.TABLE_LISTVIEW,
    argument: "updatedAt",
  },
  {
    name: "",
    type: ColumnTypes.custom,
    hideHeader: true,
    display: DisplayMode.TABLE,
    CustomHtml: ({ data, loadData }: { data: User; loadData: () => void }) => (
      <>
        <UserActionUpdate data={data} loadData={loadData} />
        <UserActionDelete data={data} loadData={loadData} />
      </>
    ),
  },

  {
    name: "",
    type: ColumnTypes.custom,
    hideHeader: true,
    display: DisplayMode.LISTVIEW,
    isListViewFooter: true,
    CustomHtml: ({ data, loadData }: { data: User; loadData: () => void }) => (
      <>
        <UserActionUpdate data={data} loadData={loadData} />
        <UserActionDelete data={data} loadData={loadData} />
      </>
    ),
  },
];

const UserTableList = ({
  viewMode,
  data,
  loadData,
}: {
  viewMode: ViewModes;
  data: User[];
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

export default UserTableList;
