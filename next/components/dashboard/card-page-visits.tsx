import React, { useEffect, useState } from "react";
import Link from "next/link";
import TableListWrapper from "../../components-shared/table-list-wrapper";
import { ActivityService } from "../../lib/modules/activity/activity.repo";
import { getUserToken } from "../../lib/modules/user/user.model";
import { Activity } from "../../lib/modules/activity/activity.model";

// components

export default function CardPageVisits() {
  const [data, setData] = useState<Activity[]>();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const token = getUserToken(false);
    ActivityService.getAll({
      query: {
        limit: 10,
        offset: 0,
        filter: {},
        order: {
          _id: -1,
        },
      },
      token,
      cache: false,
      fragment: ActivityService.fullFragment,
    })
      .then((data) => {
        console.log("data", data.data);
        setData(data.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0 bg-seconds-dark">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-white">Activities</h3>
            </div>
            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
              <Link href={"/activity"}>
                <button
                  className="bg-pink-700 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  See all
                </button>
              </Link>
            </div>
          </div>
        </div>
        <TableListWrapper>
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-6 bg-blue-50 text-gray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Message
                </th>
                <th className="px-6 bg-blue-50 text-gray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  User
                </th>
                <th className="px-6 bg-blue-50 text-gray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Type
                </th>
                <th className="px-6 bg-blue-50 text-gray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Table
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, k) => {
                return (
                  <tr key={k}>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                      {item.message}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {item.userId}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {item.type}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {item.changedFactor}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </TableListWrapper>
      </div>
    </>
  );
}
