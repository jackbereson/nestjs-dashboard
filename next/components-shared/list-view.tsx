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
// import TableDropdown from "../components/dropdowns/table-dropdown";

const ListView = ({
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
    <div className="grid grid-cols-1 lg:grid-cols-3 xs:grid-cols-2 gap-4 p-2">
      {!data || data.length === 0 ? (
        <div
          style={{ height: "300px" }}
          className="text-xl flex justify-center items-center lg:col-span-3 xs:col-span-2"
        >
          <NextIcon name={FCIcons.FcBiotech} className="" /> No record
        </div>
      ) : (
        data.map((item, k) => {
          return (
            <div
              key={k}
              className="relative grid grid-cols-4 border shadow p-3 rounded text-sm divide-y pb-10"
            >
              {columnData.map(
                (
                  {
                    type,
                    CustomHtml,
                    argument,
                    typeData,
                    name,
                    display,
                    booleanText,
                    isListViewFooter,
                  },
                  key
                ) => {
                  let element = <></>;
                  if (type === ColumnTypes.string) {
                    element = <p className="truncate xl:w-60 lg:w-40  sm:w-32">{item[argument]}</p>;
                  }

                  if (type === ColumnTypes.link) {
                    element = (
                      <p className="truncate xl:w-60 lg:w-40 sm:w-32">
                        <a className="text-primary" href={item[argument]} target="_blank">
                          {item[argument]}
                        </a>
                      </p>
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

                  if (type === ColumnTypes.datetime) {
                    element = (
                      <>
                        {item[argument] &&
                          moment(item[argument]).tz(TIMEZONE_CODE).format(formatFullTime)}
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
                              width={100}
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
                          "px-4 rounded-full shadow"
                        )}
                      >
                        {typeData.find((type) => item[argument] === type.code)?.name}
                      </div>
                    );
                  }
                  if (type === ColumnTypes.custom) {
                    element = <CustomHtml data={item} loadData={loadData} />;
                  }

                  if (![DisplayMode.LISTVIEW, DisplayMode.TABLE_LISTVIEW].includes(display)) {
                    element = null;
                  }

                  return element ? (
                    isListViewFooter ? (
                      <div
                        className="absolute border-none bottom-1 bg-primary-light w-full flex"
                        key={key}
                      >
                        {element}
                      </div>
                    ) : (
                      <Fragment key={key}>
                        <div className="font-semibold p-1 flex items-center capitalize text-primary-dark dark:text-primary">
                          {name}
                        </div>
                        <div className="col-span-3 p-1 flex items-center">
                          <div>{element}</div>
                        </div>
                      </Fragment>
                    )
                  ) : (
                    <Fragment key={key} />
                  );
                }
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default ListView;
