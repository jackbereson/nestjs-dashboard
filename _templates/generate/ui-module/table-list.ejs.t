---
to: next/components/<%= h.changeCase.paramCase(name) %>/<%= h.changeCase.paramCase(name) %>-table-list.tsx
---
import React from "react";
import {
  BaseModelArgNames,
  BaseModelArgs,
} from "../../lib/models/base-model.model";
import {
  <%= h.inflection.camelize(name) %>,
  <%= h.inflection.camelize(name) %>ArgNames,
  <%= h.inflection.camelize(name) %>Args,
} from "../../lib/modules/<%= h.changeCase.paramCase(name) %>/<%= h.changeCase.paramCase(name) %>.model";
import {
  ColumnData,
  ColumnTypes,
  DisplayMode,
  ViewModes,
} from "../../lib/models/page.model";
import <%= h.inflection.camelize(name) %>ActionDelete from "./<%= h.changeCase.paramCase(name) %>-action-delete";
import <%= h.inflection.camelize(name) %>ActionUpdate from "./<%= h.changeCase.paramCase(name) %>-action-update";
import TableView from "../../components-shared/table-view";
import ListView from "../../components-shared/list-view";

const columnData: ColumnData[] = [
  {
    name: <%= h.inflection.camelize(name) %>ArgNames.name,
    argument: <%= h.inflection.camelize(name) %>Args.name,
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
      data: <%= h.inflection.camelize(name) %>;
      loadData: () => void;
    }) => (
      <>
        <<%= h.inflection.camelize(name) %>ActionUpdate data={data} loadData={loadData} />
        <<%= h.inflection.camelize(name) %>ActionDelete data={data} loadData={loadData} />
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
      data: <%= h.inflection.camelize(name) %>;
      loadData: () => void;
    }) => (
      <>
        <<%= h.inflection.camelize(name) %>ActionUpdate data={data} loadData={loadData}  />
        <<%= h.inflection.camelize(name) %>ActionDelete data={data} loadData={loadData}  />
      </>
    ),
  },
];

const <%= h.inflection.camelize(name) %>TableList = ({
  viewMode,
  data,
  loadData,
}: {
  viewMode: ViewModes;
  data: <%= h.inflection.camelize(name) %>[];
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

export default <%= h.inflection.camelize(name) %>TableList;
