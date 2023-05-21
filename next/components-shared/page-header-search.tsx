import { useRef } from "react";
import NextIcon, { FCIcons } from "./next-icon";

const PageHeaderSearch = ({
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
    <div className="bg-white px-2 py-1 grid grid-cols-4 md:col-span-2 rounded-md">
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

export default PageHeaderSearch;
