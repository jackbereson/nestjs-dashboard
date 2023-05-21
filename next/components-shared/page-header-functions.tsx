import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useAuth from "../hooks/use-auth";
import useMenu from "../hooks/use-menu";
import { PageConfigs, ViewModes } from "../lib/models/page.model";
import TableFunction, { TableFunctionType } from "./table-function";

const PageHeaderFunctions = ({
  setViewMode,
  children,
}: {
  setViewMode?: any;
  children?: any;
}) => {
  const [menuItem, setMenuItem] = useState(null);
  const router = useRouter();
  const auth = useAuth();
  const [menu] = useMenu();

  useEffect(() => {
    if (auth) {
      const [, path] = router.pathname.split("/");

      if (menu) {
        const menuItem = menu.find((item) => {
          const [, url] = item.url.split("/");
          return path === url;
        });

        setMenuItem(menuItem);
      }
    }
  }, [auth, menu]);

  const toggleListMode = () => {
    const pageConfig: PageConfigs = { viewMode: ViewModes.LIST };
    localStorage.setItem(menuItem?.code, JSON.stringify(pageConfig));
    setViewMode(ViewModes.LIST);
  };
  const toggleTableMode = () => {
    const pageConfig: PageConfigs = { viewMode: ViewModes.TABLE };
    localStorage.setItem(menuItem?.code, JSON.stringify(pageConfig));
    setViewMode(ViewModes.TABLE);
  };

  const tableFunctions: TableFunctionType[] = [
    {
      icon: "FcDataSheet",
      action: toggleTableMode,
      code: ViewModes.TABLE,
      className: "bg-white text-black",
      modeView: true,
    },
    {
      icon: "FcTodoList",
      action: toggleListMode,
      code: ViewModes.LIST,
      className: "bg-white text-black",
      modeView: true,
    },
  ];

  return (
    <div className="md:col-span-2">
      <div className="relative w-full max-w-full flex-grow flex-1 text-right">
        <TableFunction tableFunctions={tableFunctions} />
        {children}
      </div>
    </div>
  );
};

export default PageHeaderFunctions;
