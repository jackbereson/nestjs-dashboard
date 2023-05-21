import { useEffect, useState } from "react";

const defaultButtonClass = `p-2 min-w-10 h-10 font-semibold border border-gray-400 text-gray-600 hover:text-primary hover:border-primary disabled:cursor-not-allowed disabled:opacity-50`;
export function PaginationComponent({
  firstButtonClass = `${defaultButtonClass}`,
  lastButtonClass = `${defaultButtonClass}`,
  prevButtonClass = `${defaultButtonClass}`,
  nextButtonClass = `${defaultButtonClass}`,
  pageButtonClass = `${defaultButtonClass}`,
  dotsButtonClass = `${defaultButtonClass}`,
  pageActiveButtonClass = `min-w-10 h-10 font-semibold border border-primary bg-primary text-white`,
  firstButtonContent = `«`,
  lastButtonContent = `»`,
  prevButtonContent = `<`,
  nextButtonContent = `>`,
  dotsButtonContent = "...",
  visiblePageCount = 5,
  limit,
  page = 1,
  total,
  ...props
}: {
  limit: number;
  page: number;
  total: number;
  firstButtonClass?: string;
  lastButtonClass?: string;
  prevButtonClass?: string;
  nextButtonClass?: string;
  pageButtonClass?: string;
  pageActiveButtonClass?: string;
  dotsButtonClass?: string;
  firstButtonContent?: string | JSX.Element;
  lastButtonContent?: string | JSX.Element;
  prevButtonContent?: string | JSX.Element;
  nextButtonContent?: string | JSX.Element;
  dotsButtonContent?: string | JSX.Element;
  visiblePageCount?: number;
  hasDots?: boolean;
  hasFirstLast?: boolean;
  onPageChange: Function;
}) {
  if (!total || !limit || !page) return <></>;

  const buttonClass = `flex-center cursor-pointer focus:outline-none bg-white`;

  const [pageCount, setPageCount] = useState(0);
  const [pages, setPages] = useState([{ index: 1 }]);

  useEffect(() => {
    let pageCount = Math.floor(total / limit) + (total % limit > 0 ? 1 : 0);
    setPageCount(pageCount);
    if (page < 1 || !pageCount) props.onPageChange(1);
    else if (page > pageCount) props.onPageChange(pageCount);
  }, [total, limit]);

  useEffect(() => {
    if (pageCount && page >= 1 && page <= pageCount) {
      let prevPageCount = Math.floor(visiblePageCount / 2);
      let minPage = page - prevPageCount;
      if (minPage <= 0) minPage = 1;

      let nextPageCount = visiblePageCount - prevPageCount;
      let maxPage = page + nextPageCount - 1;
      if (maxPage > pageCount) maxPage = pageCount;

      while (minPage + visiblePageCount > pageCount + 1 && minPage > 1) minPage--;
      let visiblePages = Array.from(
        Array(visiblePageCount > pageCount ? pageCount : visiblePageCount).keys()
      ).map((x) => ({ index: x + minPage })) as { index: any }[];

      if (props.hasDots && pageCount > visiblePages.length) {
        visiblePages.splice(0, 1, { index: 1 });
        visiblePages.splice(visiblePages.length - 1, 1, { index: pageCount });
        if (minPage >= prevPageCount) {
          visiblePages.splice(1, 0, { index: -2 });
        }
        if (maxPage <= pageCount - nextPageCount + 2) {
          visiblePages.splice(visiblePages.length - 1, 0, { index: -1 });
        }

        if (minPage < prevPageCount) {
          for (let i = 0; i < visiblePageCount; i++) {
            if (visiblePages[i].index == i + 1) continue;
            else {
              if (visiblePages[i].index < 0) {
                visiblePages.splice(i, 0, { index: i + 1 });
              } else {
                visiblePages.splice(i, 1, { index: i + 1 });
              }
            }
          }
        }
        if (maxPage > pageCount - nextPageCount + 2) {
          let lastIndex = visiblePages.length - 1;
          for (let i = 0; i < visiblePageCount; i++) {
            if (visiblePages[lastIndex - i].index == pageCount - i) continue;
            else {
              if (visiblePages[lastIndex - i].index < 0) {
                visiblePages.splice(lastIndex - i + 1, 0, { index: pageCount - i });
              } else {
                visiblePages.splice(lastIndex - i, 1, { index: pageCount - i });
              }
            }
          }
        }

        if (visiblePages[0].index == 1 && visiblePages[1].index < 0 && visiblePages[2].index == 3) {
          visiblePages[1].index = 2;
        }
        if (visiblePages[0].index == 1 && visiblePages[1].index < 0 && visiblePages[2].index == 2) {
          visiblePages.splice(1, 1);
        }
        if (
          visiblePages[visiblePages.length - 1].index == pageCount &&
          visiblePages[visiblePages.length - 2].index < 0 &&
          visiblePages[visiblePages.length - 3].index == pageCount - 2
        ) {
          visiblePages[visiblePages.length - 2].index = pageCount - 1;
        }
        if (
          visiblePages[visiblePages.length - 1].index == pageCount &&
          visiblePages[visiblePages.length - 2].index < 0 &&
          visiblePages[visiblePages.length - 3].index == pageCount - 1
        ) {
          visiblePages.splice(visiblePages.length - 2, 1);
        }
      }

      setPages(visiblePages);
    }
  }, [visiblePageCount, pageCount, page]);

  const handlePageChange = (pageIndex) => {
    if (pageIndex < 1 || pageIndex > pageCount) return;
    if (pageIndex != page) props.onPageChange(pageIndex);
  };

  return (
    <>
      {!!pages?.length && (
        <div className="flex">
          {props.hasFirstLast && (
            <button
              className={`${buttonClass} ${firstButtonClass}`}
              onClick={() => handlePageChange(1)}
              disabled={page <= 1}
            >
              {firstButtonContent}
            </button>
          )}
          <button
            className={`${buttonClass} ${prevButtonClass}`}
            onClick={() => handlePageChange(page - 1)}
            disabled={page <= 1}
          >
            {prevButtonContent}
          </button>
          {pages.map((currentPage) => (
            <button
              key={currentPage.index}
              className={`${buttonClass} ${
                currentPage.index > 0
                  ? page == currentPage.index
                    ? pageActiveButtonClass
                    : pageButtonClass
                  : dotsButtonClass
              }`}
              disabled={currentPage.index < 0 || typeof currentPage.index == "string"}
              onClick={() => handlePageChange(currentPage.index)}
            >
              {currentPage.index > 0 ? currentPage.index : dotsButtonContent}
            </button>
          ))}
          <button
            className={`${buttonClass} ${nextButtonClass}`}
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= pageCount}
          >
            {nextButtonContent}
          </button>
          {props.hasFirstLast && (
            <button
              className={`${buttonClass} ${lastButtonClass}`}
              onClick={() => handlePageChange(pageCount)}
              disabled={page >= pageCount}
            >
              {lastButtonContent}
            </button>
          )}
        </div>
      )}
    </>
  );
}
