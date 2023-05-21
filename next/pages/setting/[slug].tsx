import React from "react";
import DecoHeader from "../../components-shared/deco-header";
import SettingDetails from "../../components/setting/setting-details";
import SettingMenu from "../../components/setting/setting-menu";
import AdminLayout from "../../layouts/admin-layout/admin.layout";
// components

// layout for page
const Settings = (props) => {
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
};

export default Settings;
Settings.Layout = AdminLayout;
