import { useRouter } from "next/router";
import Link from "next/link";
import { adminMenu } from "../../../../../../shared/menu-data";
import { classNames } from "../../../../../../lib/helpers/design";

const MainMenu = () => {
  const router = useRouter();
  return (
    <div className="hidden md:block">
      <div className="ml-3 flex space-x-4 items-center">
        {adminMenu.map(({ title, url }, k) => (
          <Link key={k} href={url}>
            <a
              className={classNames(
                url === router.pathname
                  ? "bg-primary text-white"
                  : "text-primary hover:bg-primary hover:text-white",
                "px-3 py-2 rounded-md lg:text-sm font-medium text-xs"
              )}
            >
              {title}
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MainMenu;
