---
to: next/pages/<%= h.changeCase.paramCase(name) %>.tsx
---
import React, { useEffect, useState } from "react";
import AdminLayout from "../layouts/admin-layout/admin.layout";
import { Pagination } from "../lib/models/base-model.model";
import { useToast } from "../providers/toast-provider";
import { setLoading } from "../redux/actions/loading.action";
import { useDispatch } from "../redux/store";
import PageHeader from "../components-shared/page-header";
import Paging from "../components-shared/paging";
import { getUserToken, ROLES } from "../lib/modules/user/user.model";
import TableListWrapper from "../components-shared/table-list-wrapper";
import PageHeaderSearch from "../components-shared/page-header-search";
import PageHeaderFunctions from "../components-shared/page-header-functions";
import TableFunction from "../components-shared/table-function";
import usePageConfigs from "../hooks/use-page-configs";
import useAuth from "../hooks/use-auth";

import { <%= h.inflection.camelize(name) %> } from "../lib/modules/<%= h.changeCase.paramCase(name) %>/<%= h.changeCase.paramCase(name) %>.model";
import { <%= h.inflection.camelize(name) %>Service } from "../lib/modules/<%= h.changeCase.paramCase(name) %>/<%= h.changeCase.paramCase(name) %>.repo";
import <%= h.inflection.camelize(name) %>TableList from "../components/<%= h.changeCase.paramCase(name) %>/<%= h.changeCase.paramCase(name) %>-table-list";
import <%= h.inflection.camelize(name) %>ActionCreate from "../components/<%= h.changeCase.paramCase(name) %>/<%= h.changeCase.paramCase(name) %>-action-create";

const <%= h.inflection.camelize(name) %>Page = (props: any) => {
  useAuth(ROLES.ADMIN_EDITOR);
  
  const [page, setPage] = useState(1);
  const [data, setData] = useState<<%= h.inflection.camelize(name) %>[]>(null);
  const [search, setSearch] = useState<string>("");
  const [length, setLength] = useState<number>(10);
  const [pagination, setPagination] = useState<Pagination>(null);
  const [viewMode, setViewMode]: any = usePageConfigs();

  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    getData({ page, length });
  }, []);

  const getData = async ({
    page,
    length,
  }: {
    page: number;
    length: number;
  }) => {
    const offset = page - 1;
    const handleResult = ({ data, pagination }: any) => {
      setData(data);
      setPagination(pagination);
      setLoading(false)(dispatch);
    };

    const handleError = (error: any) => {
      console.log("error", error);
      toast.error("System error! Please visit later. Thank you.");
      setLoading(false)(dispatch);
    };

    setLoading(true)(dispatch);
    // const filterParams = {};

    // if (startDate && endDate) {
    //   set(filterParams, "resultAt", {
    //     __gte: startDate,
    //     __lt: endDate,
    //   });
    // }

    const token = getUserToken(false);

    <%= h.inflection.camelize(name) %>Service.getAll({
      query: {
        limit: length,
        offset: offset * length,
        search,
        filter: {},
        order: {
          _id: -1,
        },
      },
      token,
      cache: false,
      fragment: <%= h.inflection.camelize(name) %>Service.fullFragment,
    })
      .then(handleResult)
      .catch(handleError);
  };

  const loadData = () => {
    getData({ page, length });
  };

  const onPageChange = (page: number) => {
    setPage(page);
    getData({ page, length });
  };

  const onLengthChange = (length: number) => {
    getData({ page, length });
    setLength(length);
  };

  return (
    <section className="w-full mb-16 p-4">
      <div className="relative shadow-lg">
        <Head {...{ loadData, search, setSearch, setViewMode }} />
        <Table
          {...{
            viewMode,
            data,
            loadData,
            pagination,
            page,
            length,
            onPageChange,
            onLengthChange,
          }}
        />
      </div>
    </section>
  );
};

<%= h.inflection.camelize(name) %>Page.Layout = AdminLayout;
export default <%= h.inflection.camelize(name) %>Page;

const Head = React.memo(({ loadData, search, setSearch, setViewMode }: any) => {
  const tableFunctions = [
    {
      icon: "FcRefresh",
      action: loadData,
      className: "bg-white text-black",
    },
  ];
  return (
    <PageHeader>
      <PageHeaderSearch {...{ loadData, search, setSearch }} />
      <PageHeaderFunctions setViewMode={setViewMode}>
        <TableFunction tableFunctions={tableFunctions} />
        <<%= h.inflection.camelize(name) %>ActionCreate loadData={loadData} />
      </PageHeaderFunctions>
    </PageHeader>
  );
});

const Table = ({
  viewMode,
  data,
  loadData,
  pagination,
  page,
  length,
  onPageChange,
  onLengthChange,
}: any) => {
  return (
    <div className="bg-seconds-light pb-1">
      <TableListWrapper>
        <<%= h.inflection.camelize(name) %>TableList
          data={data}
          loadData={loadData}
          viewMode={viewMode}
        />
      </TableListWrapper>
      <Paging
        onLengthChange={onLengthChange}
        onPageChange={onPageChange}
        pagination={pagination}
        page={page}
        length={length}
      />
    </div>
  );
};
