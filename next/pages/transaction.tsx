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

import { Transaction, TransactionEvent } from "../lib/modules/transaction/transaction.model";
import { TransactionService } from "../lib/modules/transaction/transaction.repo";
import TransactionTableList from "../components/transaction/transaction-table-list";
import { classNames } from "../lib/helpers/design";
import { Button } from "../components-shared/shared/utilities/form/button";
import NextIcon, { FCIconData } from "../components-shared/next-icon";
import { useWeb3js } from "../providers/web3-provider";
import useContract from "../hooks/use-contract";
import { ChainNetworks, networks } from "../lib/helpers/network.helper";
import WalletSelectionModal from "../components-shared/wallet-selection-modal";
import { EnvKeys } from "../lib/helpers/env.helper";
import useEnv from "../hooks/use-env";

const TransactionPage = (props: any) => {
  useAuth(ROLES.ADMIN_EDITOR);

  const [page, setPage] = useState(1);
  const [data, setData] = useState<Transaction[]>(null);
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

    TransactionService.getAll({
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
      fragment: TransactionService.fullFragment,
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

TransactionPage.Layout = AdminLayout;
export default TransactionPage;

const Head = React.memo(({ loadData, search, setSearch, setViewMode }: any) => {
  const auth = useAuth();
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
        {auth && <AllowSaleButton loadData={loadData} />}
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
        <TransactionTableList data={data} loadData={loadData} viewMode={viewMode} />
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

const AllowSaleButton = ({ loadData }) => {
  const auth = useAuth();
  const { changeNetwork, checkNetwork, signNonce, currentAccount } = useWeb3js();

  const dispatch = useDispatch();
  const toast = useToast();
  const isLoading = useSelector((store) => store.loadingReducer.loadingStatus);

  const { setAllowSale, getMetamaskError, getBalance } = useContract();
  const publicAddress: string = useEnv(EnvKeys.walletAddress);
  const [signinModalOpen, setSigninModalOpen] = useState(false);

  const switchNetwork = () => {
    setLoading(true)(dispatch);
    changeNetwork({ networkName: ChainNetworks.default })
      ?.then(() => {
        setLoading(false)(dispatch);
      })
      ?.catch((error) => {
        setLoading(false)(dispatch);
        console.log("error", error);
      });
  };

  const allowSale = async () => {
    const validNetwork = checkNetwork({ networkName: ChainNetworks.default });
    if (!validNetwork) {
      toast.error(`Please change ${networks[ChainNetworks.default].chainName} network`);
      switchNetwork();
      return;
    }

    interactMetamask();
  };

  const interactMetamask = () => {
    setLoading(true)(dispatch);
    const token = getUserToken(false);
    setAllowSale({ hostAddress: publicAddress, allowed: true })
      .then((smData) => {
        console.log("smData", smData);
        const transactionHash = smData.transactionHash;
        const blockNumber = parseInt(smData.blockNumber);

        TransactionService.setSMSetting({
          blockNumber,
          token,
          transactionHash,
          event: TransactionEvent.ALLOW_SALE,
          value: true,
        })
          .then((res) => {
            console.log("Allow Sale res", res);
            setLoading(false)(dispatch);
            loadData();
            toast.success("Allow Sale successfully.");
          })
          .catch((error) => {
            setLoading(false)(dispatch);
            console.log("error", error);
            toast.error("Allow Sale unsuccessfully.");
          });
      })
      .catch((error: Error) => {
        setLoading(false)(dispatch);
        console.log("error", error);
        const message = getMetamaskError(error);
        toast.error(message);
      });
  };

  return (
    <>
      <Button
        className={classNames(
          "w-8 h-9 rounded outline-none focus:outline-none",
          "mr-1 mb-1 ease-linear transition-all duration-150 ",
          "bg-primary text-white"
        )}
        primary
        icon={<NextIcon name={"FcApprove"} className="text-xl" />}
        onClick={allowSale}
      />
      {signinModalOpen && (
        <WalletSelectionModal isOpen={signinModalOpen} setOpen={setSigninModalOpen} />
      )}
    </>
  );
};