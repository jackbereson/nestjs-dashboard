import { useEffect, useState } from "react";
import MainMenu from "./components/main-menu";
import SidebarAction from "./components/sidebar-action";
import UserAction from "./components/user-action";
import Link from "next/link";
import Image from "next/image";
import { CloudUploadIcon, LoginIcon } from "@heroicons/react/solid";
import useAuth from "../../../../hooks/use-auth";
import { ButtonLink } from "../../../../components-shared/shared/utilities/form/button-link";

const Navbar = () => {
  const [action, setAction] = useState("");
  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Logo />
            </div>
            <SidebarAction
              display={action === actionType.SIDEBAR}
              setAction={setAction}
            />
            <MainMenu />
          </div>
          <div className="md:block">
            <Authentication {...{ action, setAction }} />
          </div>
        </div>
      </div>
    </nav>
  );
};

const Authentication = ({ action, setAction }) => {
  const [authDisplay, setDisplayAuth] = useState(false);

  const auth = useAuth();

  useEffect(() => {
    if (auth) {
      setDisplayAuth(true);
    }
  }, [auth]);

  const renderUser = () => (
    <>
      <div className="ml-4 flex items-center md:ml-6">
        <UserAction
          display={action === actionType.USER}
          setAction={setAction}
        />
      </div>
    </>
  );

  const renderAuth = () => (
    <>
      <div className="ml-4 md:ml-6 gap-2 flex items-center">
        <ButtonLink className='font-light flex gap-2 p-0 text-sm px-1' primary href={`/signin`}>
          <LoginIcon className="h-6 w-6" />
          <span>Sign in</span>
        </ButtonLink>
        <ButtonLink className='font-light flex gap-2 p-0 text-sm px-1'  primary href={`/signup`}>
          <CloudUploadIcon className="h-6 w-6" />
          <span>Sign up</span>
        </ButtonLink>
      </div>
    </>
  );

  return authDisplay ? renderUser() : renderAuth();
};

const Logo = () => (
  <Link href="/">
    <a>
      <Image
        className="cursor-pointer h-8 w-8"
        src="/images/logo.png"
        alt="logo"
        width={32}
        height={32}
      />
    </a>
  </Link>
);

export const actionType = {
  NOTICE: "NOTICE",
  USER: "USER",
  SIDEBAR: "SIDEBAR",
};

export default Navbar;
