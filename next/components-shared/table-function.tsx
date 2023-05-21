import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { classNames } from "../lib/helpers/design";
import useAuth from "../hooks/use-auth";
import useMenu from "../hooks/use-menu";
import { ViewModes } from "../lib/models/page.model";
import { Button } from "./shared/utilities/form/button";

import NextIcon from "./next-icon";

export type TableFunctionType = {
  icon: string;
  code?: string;
  name?: string;
  action: () => void;
  className?: string;
  modeView?: boolean;
};

const TableFunction = ({
  tableFunctions,
}: {
  tableFunctions: TableFunctionType[];
}) => {
  const [viewMode, setViewMode] = useState<ViewModes>(ViewModes.LIST);
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

  useEffect(() => {
    loadData();
  }, [menuItem]);

  const loadData = () => {
    if (menuItem) {
      const mode = JSON.parse(localStorage.getItem(menuItem?.code)) as {
        viewMode: ViewModes;
      };
      if (mode) {
        setViewMode(mode.viewMode);
      }
    }
  };

  return (
    <>
      {tableFunctions.map(
        ({ icon, action, className, name, code, modeView }, k) => {
          const actionCustom = () => {
            if (modeView) {
              action();
              loadData();
            }
            action();
          };

          return (
            <Button
              key={k}
              className={classNames(
                "w-8 h-9 rounded outline-none focus:outline-none",
                "mr-1 mb-1 ease-linear transition-all duration-150 ",
                code === viewMode ? "bg-primary text-white" : "",
                className
              )}
              primary
              text={name}
              icon={<NextIcon  name={icon} className="text-xl" />}
              onClick={actionCustom}
            />
          );
        }
      )}
    </>
  );
};

export default TableFunction;
