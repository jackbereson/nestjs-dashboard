import React, { useEffect, useState } from "react";
import Link from "next/link";
import { SettingKeys } from "../../../lib/helpers/setting.helper";
import NextIcon, { FCIcons } from "../../../components-shared/next-icon";
import useSettings from "../../../hooks/use-settings";

const AdminSidebarBranch = () => {
  const [logo, setLogo] = useState(null);
  const [title, setTitle] = useState(null);
  const settings = useSettings();

  useEffect(() => {
    if (settings) {
      const logoSetting = settings.find((setting) => setting.key === SettingKeys.LOGO_URL);

      const titleSetting = settings.find((setting) => setting.key === SettingKeys.TITLE);
      logoSetting && setLogo(logoSetting.value);
      titleSetting && setTitle(titleSetting.value);
    }
  }, [settings]);

  return (
    <>
      <div className="hidden md:flex items-center justify-center ">
        <div className="flex items-center px-8">
          <Link href="/dashboard">
            <a className="md:block md:pb-2 text-gray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase text-center rounded-md">
              {logo ? (
                <img src={logo} />
              ) : (
                <div className="flex justify-center">
                  <NextIcon name={FCIcons.FcSynchronize} className="text-2xl animate-spin" />
                </div>
              )}{" "}
            </a>
          </Link>
        </div>
      </div>
      <Link href="/dashboard">
        <a className="sm:hidden  text-left md:pb-2 text-gray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0">
          {title ? title : "Loading"}
        </a>
      </Link>
    </>
  );
};

export default AdminSidebarBranch;
