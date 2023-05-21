import React, { useEffect, useRef, useState } from "react";
import { Pagination } from "../../lib/models/base-model.model";
import { Media } from "../../lib/modules/media/media.model";
import { MediaService } from "../../lib/modules/media/media.repo";
import { getUserToken } from "../../lib/modules/user/user.model";
import { useToast } from "../../providers/toast-provider";
import { setLoading } from "../../redux/actions/loading.action";
import { useDispatch } from "../../redux/store";
import Paging from "../../components-shared/paging";
import { Dialog } from "../../components-shared/shared/utilities/dialog/dialog";
import NextIcon, { FCIcons } from "../../components-shared/next-icon";
import { Img } from "../../components-shared/shared/utilities/img";

function MediaDialog({
  isOpen,
  onClose,
  onChange,
}: {
  isOpen: boolean;
  onClose: Function;
  onChange;
}) {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<Media[]>(null);
  const [search, setSearch] = useState<string>("");
  const [length, setLength] = useState<number>(10);
  const [pagination, setPagination] = useState<Pagination>(null);

  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    getData({ page, length });
  }, []);

  const choseImg = (url) => {
    onChange(url);
    onClose();
  };

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

    MediaService.getAll({
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
      fragment: MediaService.fullFragment,
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
      width="800px"
      dialogClass="relative bg-white shadow-md rounded m-auto"
      isOpen={isOpen}
      onClose={onClose}
      onOverlayClick={() => {}}
      title="Choose a picture"
    >
      <div>
        <Head {...{ loadData, search, setSearch }} />
        <Table
          {...{
            data,
            loadData,
            pagination,
            page,
            length,
            choseImg,
            onPageChange,
            onLengthChange,
          }}
        />
      </div>
    </Dialog>
  );
}

export default MediaDialog;

const Head = React.memo(({ loadData, search, setSearch }: any) => {
  return <HeaderSearch {...{ loadData, search, setSearch }} />;
});

const HeaderSearch = ({
  search,
  setSearch,
  loadData,
  children,
}: {
  search?: string;
  setSearch?: any;
  loadData?: (search?: string) => void;
  children?: any;
}) => {
  // console.count("header rerender");
  const searchInput = useRef<HTMLInputElement>();
  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      searchData();
    }
  };

  const onChangeSearchInput = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const searchData = () => {
    const search = searchInput.current.value;
    loadData(search);
  };

  return (
    <div className=" bg-white p-3 border-b grid grid-cols-4 md:col-span-2 rounded-md">
      <div className="flex items-center col-span-3">
        <NextIcon className="text-xl" name={FCIcons.FcSearch} />{" "}
        <input
          name="search"
          ref={searchInput}
          className="px-1"
          placeholder="Search here"
          type="text"
          value={search}
          onChange={onChangeSearchInput}
          onKeyDown={onKeyDown}
          style={{ width: "100%" }}
        />{" "}
      </div>
      <div className="text-right">
        <button className="text-sm underline mr-3" onClick={searchData}>
          Search
        </button>
      </div>
      {children}
    </div>
  );
};

const Table = ({
  data,
  pagination,
  page,
  length,
  choseImg,
  onPageChange,
  onLengthChange,
}: {
  data: Media[];
  pagination;
  page;
  length;
  choseImg;
  onPageChange;
  onLengthChange;
}) => {
  return (
    <div className="p-3 bg-seconds-light pb-1">
      {data?.length === 0 ? (
        <div className="h-96 flex justify-center items-center">No image...</div>
      ) : (
        <>
          <div className="grid grid-cols-6 gap-2 items-start h-80 overflow-auto">
            {data?.map((item, k) => {
              return (
                <button
                  className="p-2 border rounded overflow-hidden"
                  key={k}
                  onClick={() => choseImg(item.url)}
                >
                  <Img src={item.url} alt={item.name} className="rounded-xl mb-4 overflow-hidden" />
                  <div className="text-xs break-words text-left">{item.name}</div>
                </button>
              );
            })}
          </div>
          <Paging
            onLengthChange={onLengthChange}
            onPageChange={onPageChange}
            pagination={pagination}
            page={page}
            length={length}
          />
        </>
      )}
    </div>
  );
};
