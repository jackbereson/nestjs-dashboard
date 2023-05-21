import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/admin-layout/admin.layout";
import { Pagination } from "../../lib/models/base-model.model";
import { useToast } from "../../providers/toast-provider";
import { setLoading } from "../../redux/actions/loading.action";
import { useDispatch } from "../../redux/store";
import PageHeader from "../../components-shared/page-header";
import Paging from "../../components-shared/paging";
import { getUserToken, ROLES } from "../../lib/modules/user/user.model";
import TableListWrapper from "../../components-shared/table-list-wrapper";
import PageHeaderSearch from "../../components-shared/page-header-search";
import PageHeaderFunctions from "../../components-shared/page-header-functions";
import TableFunction from "../../components-shared/table-function";
import usePageConfigs from "../../hooks/use-page-configs";
import useAuth from "../../hooks/use-auth";

import { MediaCategory } from "../../lib/modules/media-category/media-category.model";
import { MediaCategoryService } from "../../lib/modules/media-category/media-category.repo";
import MediaCategoryTableList from "./media-category-table-list";
import MediaCategoryActionCreate from "./media-category-action-create";
import { Dialog } from "../../components-shared/shared/utilities/dialog/dialog";

const ModalMediaCategory = ({ open, setOpen }) => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<MediaCategory[]>(null);
  const [search, setSearch] = useState<string>("");
  const [length, setLength] = useState<number>(10);
  const [pagination, setPagination] = useState<Pagination>(null);
  const [viewMode, setViewMode]: any = usePageConfigs();

  const dispatch = useDispatch();
  const toast = useToast();

  const turnOffModal = () => {
    setOpen(!open);
  };

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

    MediaCategoryService.getAll({
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
      fragment: MediaCategoryService.fullFragment,
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
    <Dialog
      width="1000px"
      dialogClass="relative bg-white shadow-md rounded m-auto"
      isOpen={open}
      onClose={turnOffModal}
      mobileMode={false}
      title="Media Category"
    >
      <section className="w-full p-4">
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
    </Dialog>
  );
};

export default ModalMediaCategory;

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
        <MediaCategoryActionCreate loadData={loadData} />
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
        <MediaCategoryTableList data={data} loadData={loadData} viewMode={viewMode} />
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
