import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Iframe from "react-iframe";
import AdminLayout from "../../layouts/admin-layout/admin.layout";
import { SettingKeys } from "../../lib/helpers/setting.helper";
import useAuth from "../../hooks/use-auth";
import useSettings from "../../hooks/use-settings";
import { MenuData } from "../../lib/models/menu-data.model";
import { ROLES } from "../../lib/modules/user/user.model";

const FramePage = () => {
  useAuth([ROLES.ADMIN]);
  const router = useRouter();
  console.log(
    "🚀 ~ file: [slug].tsx ~ line 14 ~ FramePage ~ router",
    router.query.slug
  );
  const settings = useSettings();
  const [data, setData] = useState<MenuData>(null);

  useEffect(() => {
    if (settings && router.query.slug) {
      const setting = settings.find(setting=>setting.key === SettingKeys.ADMIN_MENU);
      const menuData = setting.value as MenuData[];
      const pageData = menuData.find(
        (menu) => menu.frame && menu.code === router.query.slug
      );
      if (pageData) {
        setData(pageData);
      }
    }
  }, [settings, router.query.slug]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen w-full">
      <div className="bg-primary-dark text-white px-4 pt-1">
        Server URL :{" "}
        <a className="text-blue-100" target="_blank" href={data.frame}>
          {data.frame}
        </a>
      </div>
      <Iframe
        url={data.frame}
        width="100%"
        height="100%"
        id="myId"
        className="myClassname"
        display="block"
        position="relative"
      />
    </div>
  );
};

FramePage.Layout = AdminLayout;
export default FramePage;
