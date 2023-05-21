import React from "react";
import { Pagination } from "../lib/models/base-model.model";
import { Select, SelectValueType } from "./shared/utilities/form/select";
import { PaginationComponent } from "./shared/utilities/pagination/pagination-component";

const Paging = React.memo(
  ({
    pagination,
    page,
    length,
    onPageChange,
    onLengthChange,
  }: {
    pagination: Pagination;
    page: number;
    length: number;
    onPageChange: Function;
    onLengthChange: Function;
  }) => {
    return (
      pagination && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 m-2">
          <div className="flex items-center justify-end md:justify-start">
            Total
            <span className="mx-2 text-primary-dark">
              {pagination?.total} records
            </span>
            <PaginationSelect length={length} onLengthChange={onLengthChange} />
          </div>
          <div className="flex justify-center md:justify-end">
            <PaginationComponent
              total={pagination?.total}
              limit={pagination?.limit}
              page={page}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      )
    );
  }
);

export default Paging;

export type Option = {
  value: number | string;
  label: string;
};

const PaginationSelect = ({
  length,
  onLengthChange,
}: {
  length: number;
  onLengthChange: any;
}) => {
  const list: Option[] = [
    {
      value: 5,
      label: "5",
    },
    {
      value: 10,
      label: "10",
    },
    {
      value: 50,
      label: "50",
    },
    {
      value: 100,
      label: "100",
    },
    {
      value: 250,
      label: "250",
    },
    {
      value: 500,
      label: "500",
    },
    {
      value: 1000,
      label: "1000",
    },
  ];

  return (
    <Select
      options={list}
      onChange={onLengthChange}
      value={length}
      valueType={SelectValueType.number}
      wrapperClassName="w-20"
      className="text-sm"
    />
  );
};
