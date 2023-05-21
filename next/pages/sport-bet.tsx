import React, { useEffect, useState } from "react";
import AdminLayout from "../layouts/admin-layout/admin.layout";
import { Pagination } from "../lib/models/base-model.model";
import { useToast } from "../providers/toast-provider";
import { setLoading } from "../redux/actions/loading.action";
import { useDispatch, useSelector } from "../redux/store";
import PageHeader from "../components-shared/page-header";
import Paging from "../components-shared/paging";
import { getUserToken, ROLES } from "../lib/modules/user/user.model";
import TableListWrapper from "../components-shared/table-list-wrapper";
import PageHeaderSearch from "../components-shared/page-header-search";
import PageHeaderFunctions from "../components-shared/page-header-functions";
import TableFunction from "../components-shared/table-function";
import usePageConfigs from "../hooks/use-page-configs";
import useAuth from "../hooks/use-auth";

import { Coins, SportBet } from "../lib/modules/sport-bet/sport-bet.model";
import { SportBetService } from "../lib/modules/sport-bet/sport-bet.repo";
import SportBetTableList from "../components/sport-bet/sport-bet-table-list";
import SportBetActionCreate from "../components/sport-bet/sport-bet-action-create";
import { Button } from "../components-shared/shared/utilities/form/button";
import { classNames } from "../lib/helpers/design";
import NextIcon from "../components-shared/next-icon";

const SportBetPage = (props: any) => {
  useAuth(ROLES.ADMIN_EDITOR);

  const [page, setPage] = useState(1);
  const [data, setData] = useState<SportBet[]>(null);
  const [search, setSearch] = useState<string>("");
  const [length, setLength] = useState<number>(10);
  const [pagination, setPagination] = useState<Pagination>(null);
  const [viewMode, setViewMode]: any = usePageConfigs();

  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    getData({ page, length });
  }, []);

  const getData = async ({ page, length }: { page: number; length: number }) => {
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

    SportBetService.getAll({
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
      fragment: SportBetService.fullFragment,
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

SportBetPage.Layout = AdminLayout;
export default SportBetPage;

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
        <CheckWinDOXAction loadData={loadData} />
        <CheckWinBUSDAction loadData={loadData} />
        <CheckWinUSDTAction loadData={loadData} />
        <SportBetActionCreate loadData={loadData} />
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
        <SportBetTableList data={data} loadData={loadData} viewMode={viewMode} />
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

const CheckWinDOXAction = ({ loadData }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const isLoading = useSelector((store) => store.loadingReducer.loadingStatus);

  const callApi = async () => {
    const token = getUserToken(false);
    SportBetService.checkBetwin({
      token,
      coin: Coins.DOX,
    })
      .then((res) => {
        console.log("Action res", res);
        if (res.success === true) {
          setLoading(false)(dispatch);
          loadData();
          toast.success("Action successfully.");
        } else {
          setLoading(false)(dispatch);
          loadData();
          toast.success("No bet here");
        }
      })
      .catch((error) => {
        setLoading(false)(dispatch);
        console.log("error", error);
        toast.error("Action unsuccessfully.");
      });
  };

  return (
    <Button
      className={classNames(
        "w-8 h-9 rounded outline-none focus:outline-none",
        "mr-1 mb-1 ease-linear transition-all duration-150 ",
        "bg-primary text-white"
      )}
      isLoading={isLoading}
      primary
      icon={<div className="text-10">{Coins.DOX}</div>}
      onClick={callApi}
    />
  );
};

const CheckWinBUSDAction = ({ loadData }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const isLoading = useSelector((store) => store.loadingReducer.loadingStatus);

  const callApi = async () => {
    const token = getUserToken(false);
    SportBetService.checkBetwin({
      token,
      coin: Coins.BUSD,
    })
      .then((res) => {
        console.log("Action res", res);
        if (res.success === true) {
          setLoading(false)(dispatch);
          loadData();
          toast.success("Action successfully.");
        } else {
          setLoading(false)(dispatch);
          loadData();
          toast.success("No bet here");
        }
      })
      .catch((error) => {
        setLoading(false)(dispatch);
        console.log("error", error);
        toast.error("Action unsuccessfully.");
      });
  };

  return (
    <Button
      className={classNames(
        "w-8 h-9 rounded outline-none focus:outline-none",
        "mr-1 mb-1 ease-linear transition-all duration-150 ",
        "bg-primary text-white"
      )}
      isLoading={isLoading}
      primary
      icon={<div className="text-10">{Coins.BUSD}</div>}
      onClick={callApi}
    />
  );
};

const CheckWinUSDTAction = ({ loadData }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const isLoading = useSelector((store) => store.loadingReducer.loadingStatus);

  const callApi = async () => {
    const token = getUserToken(false);
    SportBetService.checkBetwin({
      token,
      coin: Coins.USDT,
    })
      .then((res) => {
        console.log("Action res", res);
        if (res.success === true) {
          setLoading(false)(dispatch);
          loadData();
          toast.success("Action successfully.");
        } else {
          setLoading(false)(dispatch);
          loadData();
          toast.success("No bet here");
        }
      })
      .catch((error) => {
        setLoading(false)(dispatch);
        console.log("error", error);
        toast.error("Action unsuccessfully.");
      });
  };

  return (
    <Button
      className={classNames(
        "w-8 h-9 rounded outline-none focus:outline-none",
        "mr-1 mb-1 ease-linear transition-all duration-150 ",
        "bg-primary text-white"
      )}
      isLoading={isLoading}
      primary
      icon={<div className="text-10">{Coins.USDT}</div>}
      onClick={callApi}
    />
  );
};
