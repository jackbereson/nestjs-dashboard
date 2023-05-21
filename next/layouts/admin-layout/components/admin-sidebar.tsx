import React, { useEffect, useState } from "react";
import Link from "next/link";
import { classNames } from "../../../lib/helpers/design";
import AdminSidebarBranch from "./admin-sidebar-branch";
import AdminSidebarMenu from "./admin-sidebar-menu";
import NextIcon from "../../../components-shared/next-icon";
import NotificationDropdown from "../../../components-shared/dropdowns/notification-dropdown";
import UserDropdown from "../../../components-shared/dropdowns/user-dropdown";
import useSettings from "../../../hooks/use-settings";
import { SettingKeys } from "../../../lib/helpers/setting.helper";
import { DefaultMenuLinks } from "../../../lib/helpers/menu.helper";

export default function AdminSidebar() {
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  return (
    <nav
      className={classNames(
        "mt-10",
        "relative z-10",
        "py-1 px-3",
        "bg-seconds-light dark:bg-seconds-dark dark:text-primary-light",
        "md:w-64 md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto",
        "md:flex-row md:flex-nowrap md:overflow-hidden",
        "shadow-xl flex flex-wrap items-center justify-between"
      )}
    >
      <div
        className={classNames(
          "md:flex-col md:items-stretch md:min-h-full md:flex-nowrap",
          "flex flex-wrap items-center justify-between",
          "w-full mx-auto px-0"
        )}
      >
        <Toggle setCollapseShow={setCollapseShow} />
        <AdminSidebarBranch />
        <User />
        <Collapse collapseShow={collapseShow} setCollapseShow={setCollapseShow}>
          <AdminSidebarMenu setCollapseShow={setCollapseShow} />
        </Collapse>
      </div>
    </nav>
  );
}

const Toggle = ({ setCollapseShow }: any) => {
  return (
    <>
      {/* Toggler */}
      <button
        className={classNames(
          "cursor-pointer text-black opacity-50 md:hidden",
          "px-3 py-1 text-xl leading-none bg-transparent rounded",
          "border border-solid border-transparent"
        )}
        type="button"
        onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
      >
        <NextIcon  name="FcMenu" className="text-xl" />
      </button>
    </>
  );
};

const User = () => {
  return (
    <ul className="md:hidden items-center flex flex-wrap list-none">
      <li className="inline-block relative">
        <NotificationDropdown />
      </li>
      <li className="inline-block relative">
        <UserDropdown />
      </li>
    </ul>
  );
};

const Collapse = ({ collapseShow, setCollapseShow, children }: any) => {
  const [title, setTitle] = useState(null);
  const settings = useSettings();

  useEffect(() => {
    if (settings) {
      const titleSetting = settings.find(
        (setting) => setting.key === SettingKeys.TITLE
      );
      titleSetting && setTitle(titleSetting.value);
    }
  }, [settings]);

  return (
    <div
      className={classNames(
        "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none",
        "shadow absolute top-0 left-0 right-0 z-40",
        "overflow-y-auto overflow-x-hidden h-auto",
        "items-center flex-1 rounded",
        collapseShow
      )}
    >
      <div
        className={classNames(
          "md:min-w-full md:hidden block pb-4 mb-4",
          "border-b border-solid border-blueGray-200"
        )}
      >
        <div className="flex flex-wrap">
          <div className="w-6/12">
            <Link href={DefaultMenuLinks.DASHBOARD}>
              <a
                className={classNames(
                  "md:block text-left md:pb-2 text-gray-600 mr-0 inline-block",
                  "whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                )}
              >
                {title ? title : "Loading"}
              </a>
            </Link>
          </div>
          <div className="w-6/12 flex justify-end">
            <button
              type="button"
              className={classNames(
                "cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl",
                "leading-none bg-transparent",
                "rounded border border-solid border-transparent"
              )}
              onClick={() => setCollapseShow("hidden")}
            >
              <NextIcon  name="FcMinus" className="text-xl" />
            </button>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};
