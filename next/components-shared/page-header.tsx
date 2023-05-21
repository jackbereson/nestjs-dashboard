import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { classNames } from "../lib/helpers/design";
import useAuth from "../hooks/use-auth";
import useMenu from "../hooks/use-menu";
import NextIcon from "./next-icon";


const PageHeader = ({ children }: any) => {
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

  const Title = () => {
    return (
      <div className="relative w-full px-4 max-w-full flex-grow flex-1 flex gap-2 justify-start items-center mb-1">
        <NextIcon name={menuItem?.icon} className='text-xl' />
        <h3 className={classNames("font-semibold text-base text-white uppercase", "")}>
          {menuItem?.title}
        </h3>
      </div>
    );
  };
  return (
    <div className="rounded-t mb-0 px-4 py-3 border-0 bg-seconds-dark">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-1">
        <Title />
        {children}
      </div>
    </div>
  );
};

export default PageHeader;
