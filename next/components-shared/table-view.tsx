import moment from "moment-timezone";
import React, { Fragment, useState } from "react";
import {
  formatDate,
  formatFullDayTime,
  formatFullTime,
  TIMEZONE_CODE,
} from "../lib/helpers/common.helper";
import { classNames } from "../lib/helpers/design";
import { ColumnData, ColumnTypes, DisplayMode } from "../lib/models/page.model";
import NextIcon, { FCIcons } from "./next-icon";
import { ImageDialog } from "./shared/utilities/dialog/image-dialog";
// import TableDropdown from "./dropdowns/table-dropdown";

const TableView = ({
  data,
  columnData,
  loadData,
}: {
  data: any[];
  columnData: ColumnData[];
  loadData?: () => void;
}) => {
  const [showImage, setShowImage] = useState("");
  return (
    <table className="items-center w-full bg-transparent border-collapse">
      <thead>
        <tr>
          {columnData.map(({ type, name, thClassName, hideHeader }, k) => {
            return (
              <th
                key={k}
                className={classNames(
                  "px-6 align-middle border border-solid py-3 text-xs uppercase",
                  "border-l-0 border-r-0 whitespace-nowrap font-semibold text-left",
                  "bg-primary-light text-primary-dark capitalize",
                  thClassName
                )}
              >
                {hideHeader ? "" : name}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {!data || data.length === 0 ? (
          <tr className="border-b border-gray-200 text-center">
            <td
              style={{ height: "300px" }}
              className="text-xl flex justify-center items-center w-screen"
              colSpan={columnData.length}
            >
              <div className="flex justify-center items-center gap-2">
                <NextIcon name={FCIcons.FcBiotech} className="" /> No record
              </div>
            </td>
          </tr>
        ) : (
          data.map((item, k) => {
            return (
              <tr key={k} className="border-b border-gray-200">
                {columnData.map(
                  (
                    { type, CustomHtml, argument, typeData, tdClassName, display, booleanText },
                    k
                  ) => {
                    let element = <></>;
                    if (type === ColumnTypes.string) {
                      element = <>{item[argument]}</>;
                    }

                    if (type === ColumnTypes.datetime) {
                      element = (
                        <>
                          {item[argument] &&
                            moment(item[argument]).tz(TIMEZONE_CODE).format(formatFullTime)}
                        </>
                      );
                    }
                    if (type === ColumnTypes.range) {
                      element = (
                        <>
                          {item[argument] &&
                            (item[argument] as string).toString().replace(",", " - ")}
                        </>
                      );
                    }
                    if (type === ColumnTypes.image) {
                      element = (
                        <>
                          {item[argument] && (
                            <>
                              <img
                                width={50}
                                className="cursor-pointer"
                                src={item[argument] as string}
                                alt="img"
                                onClick={() => setShowImage(item[argument])}
                              />
                              <ImageDialog
                                isOpen={!!showImage}
                                image={showImage}
                                onClose={() => setShowImage("")}
                              />
                            </>
                          )}
                        </>
                      );
                    }

                    if (type === ColumnTypes.dayTime) {
                      element = (
                        <>
                          {item[argument] &&
                            moment(item[argument]).tz(TIMEZONE_CODE).format(formatFullDayTime)}
                        </>
                      );
                    }

                    if (type === ColumnTypes.date) {
                      element = (
                        <>
                          {item[argument] &&
                            moment(item[argument]).tz(TIMEZONE_CODE).format(formatDate)}
                        </>
                      );
                    }

                    if (type === ColumnTypes.link) {
                      element = (
                        <p className="truncate w-60">
                          <a className="text-primary" href={item[argument]} target="_blank">
                            {item[argument]}
                          </a>
                        </p>
                      );
                    }

                    if (type === ColumnTypes.boolean) {
                      element = item[argument] ? (
                        <NextIcon className="text-2xl" name={FCIcons.FcCheckmark} />
                      ) : (
                        <NextIcon className="text-2xl" name={FCIcons.FcCancel} />
                      );
                    }

                    if (type === ColumnTypes.type) {
                      element = (
                        <div
                          className={classNames(
                            typeData.find((type) => item[argument] === type.code)?.className,
                            "px-2 text-center rounded-full"
                          )}
                        >
                          {typeData.find((type) => item[argument] === type.code)?.name}
                        </div>
                      );
                    }
                    if (type === ColumnTypes.custom) {
                      element = <CustomHtml data={item} loadData={loadData} />;
                    }

                    if (![DisplayMode.TABLE, DisplayMode.TABLE_LISTVIEW].includes(display)) {
                      element = null;
                    }

                    return element ? (
                      <td
                        key={k}
                        className={classNames(
                          "px-6 align-middle text-xs whitespace-nowrap p-1",
                          "border-t-0 border-l-0 border-r-0 text-left",
                          tdClassName
                        )}
                      >
                        {element}
                      </td>
                    ) : (
                      <Fragment key={k} />
                    );
                  }
                )}
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
};

export default TableView;
