import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { XIcon } from "@heroicons/react/outline";
import useComponentVisible from "../../../../../../hooks/use-component-visible";
import { classNames } from "../../../../../../lib/helpers/design";
import { adminMenu } from "../../../../../../shared/menu-data";

const SiderbarMenu = ({ display, toggle }: any) => {
  const { ref, isComponentVisible } = useComponentVisible(true);

  const router = useRouter();

  useEffect(() => {
    !isComponentVisible && toggle();
  }, [isComponentVisible]);

  return (
    <div ref={ref}>
      <div
        className={classNames(
          display ? "" : "hidden",
          "fixed z-200 inset-y-0 left-0 w-64 transition duration-300 transform bg-primary-dark overflow-y-auto  translate-x-0 ease-out"
        )}
      >
        <header className="flex justify-end">
          <button
            className="inline-flex items-center justify-center w-6 h-6 m-1 text-white transition-colors duration-150 rounded dark:hover:text-gray-200 hover: hover:text-red-300"
            aria-label="close"
            onClick={toggle}
          >
            <XIcon className="w-4 h-4" />
          </button>
        </header>
        <div className="flex items-center justify-center">
          <div className="flex items-center px-8">
            <img src="/images/DC8-logo-big.png" />
          </div>
        </div>
        <FunctionMenu toggle={toggle} />
      </div>

      <div
        className="fixed inset-0 transition-opacity z-100"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 bg-gray-900 opacity-75"
          onClick={toggle}
        ></div>
      </div>
    </div>
  );
};

export default SiderbarMenu;

const FunctionMenu = ({ toggle }: any) => {
  const router = useRouter();
  const list = adminMenu.map((v: any, _) => {
    v.active = v.url === router.pathname;
    return v;
  });

  return (
    <nav className="mt-1">
      {list.map(({ title, url, active, icon }, k) => (
        <Link key={k} href={url}>
          <a
            className={classNames(
              active
                ? "bg-white bg-opacity-25 text-gray-100 hover:bg-primary-dark hover:text-primary-dark"
                : "text-white hover:bg-seconds-dark hover:text-gray-100",
              "flex items-center mt-2 py-2 px-6"
            )}
            onClick={toggle}
          >
            {icon}
            <span className="mx-3">{title}</span>
          </a>
        </Link>
      ))}
    </nav>
  );
};

