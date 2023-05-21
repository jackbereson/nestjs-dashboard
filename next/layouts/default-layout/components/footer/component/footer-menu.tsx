import Link from "next/link";
import { footerItems } from "../../../../../shared/menu-data";

const FooterMenu = () => {
  return (
    <>
      <h5 className="uppercase tracking-wider font-semibold">Games</h5>
      <ul className="mt-4">
        {footerItems.map(({ title, url }, k) => (
          <li className="mt-2" key={k}>
            <Link href={url}>
              <a className="opacity-75 hover:opacity-100">{title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default FooterMenu;
