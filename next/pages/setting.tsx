import React from "react";
import AdminLayout from "../layouts/admin-layout/admin.layout";
import DecoHeader from "../components-shared/deco-header";
import SettingDetails from "../components/setting/setting-details";
import SettingMenu from "../components/setting/setting-menu";
import useAuth from "../hooks/use-auth";
import { ROLES } from "../lib/modules/user/user.model";

export default function Settings() {
  useAuth(ROLES.ADMIN_EDITOR);

  return (
    <>
      <DecoHeader />
      <div className="px-4 md:px-2 mx-auto w-full -mt-24">
        <div className="flex flex-wrap">
          <div className="w-full lg:w-4/12 px-1">
            <SettingMenu />
          </div>
          <div className="w-full lg:w-8/12 px-2">
            <SettingDetails />
          </div>
        </div>
      </div>
    </>
  );
}

Settings.Layout = AdminLayout;
