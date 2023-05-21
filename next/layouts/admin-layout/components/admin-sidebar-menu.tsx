import React, { Fragment } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import useMenu from "../../../hooks/use-menu";
import { MenuData } from "../../../lib/models/menu-data.model";
import { classNames } from "../../../lib/helpers/design";
import NextIcon from "../../../components-shared/next-icon";
import AdminInfo from "./admin-info";

const AdminSidebarMenu = ({ setCollapseShow }: any) => {
  const router = useRouter();
  const [menu, menuCategories, useCategory] = useMenu();

  let pathCode = router.pathname;
  [, pathCode] = router.pathname.split("/");
  const slugCode = router.query.slug;

  const MenuItem = ({ menuData }: { menuData: MenuData }) => {
    return (
      <li className="items-center mb-1">
        <Link href={menuData.url}>
          <a
            onClick={() => {
              setCollapseShow("hidden");
            }}
            className={classNames(
              "text-xs uppercase py-2  font-bold block px-4 rounded-md transition",
              "hover:text-white hover:bg-primary flex items-center gap-4",
              menuData.code === slugCode || menuData.code === pathCode
                ? "text-white bg-primary-dark"
                : ""
            )}
          >
            <div className='bg-white rounded-full p-0.5'>
              <NextIcon name={menuData.icon} className="text-xl" />
            </div>
            {menuData.title}
          </a>
        </Link>
      </li>
    );
  };

  if (!menu || !menuCategories) {
    return (
      <>
        <hr className="my-3 md:min-w-full" />
        <h6 className="md:min-w-full text-primary-dark dark:text-primary-light text-xs uppercase font-bold block pt-1 pb-1 no-underline">
          Loading...
        </h6>
      </>
    );
  }

  if (useCategory) {
    return (
      menu &&
      menuCategories && (
        <>
          <AdminInfo />
          {menuCategories.map((cate, i) => {
            const cateMenu = menu.filter((m) => m.catergoryCode === cate.code);
            return (
              cateMenu.length > 0 && (
                <Fragment key={i}>
                  <hr className="my-3 md:min-w-full" />
                  <h6 className="md:min-w-full text-primary-dark dark:text-primary-light text-xs uppercase font-bold block pt-1 pb-1 no-underline">
                    {cate.name}
                  </h6>

                  <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                    {cateMenu.map((item, i) => {
                      return <MenuItem menuData={item} key={i} />;
                    })}
                  </ul>
                </Fragment>
              )
            );
          })}
        </>
      )
    );
  }

  return (
    menu &&
    menuCategories && (
      <>
        <AdminInfo />
        <ul className="md:flex-col md:min-w-full flex flex-col list-none">
          {menu.map((item, i) => (
            <MenuItem menuData={item} key={i} />
          ))}
        </ul>
      </>
    )
  );
};

export default AdminSidebarMenu;
