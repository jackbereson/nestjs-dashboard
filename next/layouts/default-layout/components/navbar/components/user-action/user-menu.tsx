import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useComponentVisible from "../../../../../../hooks/use-component-visible";
import useMenu from "../../../../../../hooks/use-menu";
import { classNames } from "../../../../../../lib/helpers/design";
import { logoutUser } from "../../../../../../redux/actions/user.action";
import { useDispatch } from "../../../../../../redux/store";
const UserMenu = ({ display, toggle }: any) => {
  const { ref, isComponentVisible } = useComponentVisible(true);
  const [menu] = useMenu();

  useEffect(() => {
    !isComponentVisible && toggle();
  }, [isComponentVisible]);

  const dispatch = useDispatch();

  const logout = () => {
    logoutUser()(dispatch);
    window.location.replace("/signin");
  };

  return (
    <div
      ref={ref}
      className={classNames(
        "z-500 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1",
        "bg-white ring-1 ring-black ring-opacity-5 border border-1 border-primary",
        "text-sm text-primary",
        display ? "" : "hidden"
      )}
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="user-menu"
    >
      {menu && menu.map(({ url, title }, k) => {
        return (
          <Link href={url} key={k}>
            <a
              className={`block px-4 py-2 hover:bg-gray-100 cursor-pointer`}
              role="menuitem"
              onClick={toggle}
            >
              {title}
            </a>
          </Link>
        );
      })}
      <button
        className={`w-full px-4 py-2 hover:bg-gray-100 focus:outline-none`}
        role="menuitem"
        onClick={logout}
      >
        Sign out
      </button>
    </div>
  );
};

export default UserMenu;
