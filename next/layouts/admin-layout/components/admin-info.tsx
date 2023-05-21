import React, { useState } from "react";
import Link from "next/link";
import { useDispatch } from "../../../redux/store";
import useAuth from "../../../hooks/use-auth";
import { logoutUser } from "../../../redux/actions/user.action";
import NextIcon, { FCIcons } from "../../../components-shared/next-icon";
import WalletSelectionModal from "../../../components-shared/wallet-selection-modal";
const AdminInfo = (props: any) => {
  const [isOpen, setOpen] = useState(false);
  const dispatch = useDispatch();
  const auth = useAuth();
  const logout = () => {
    logoutUser()(dispatch);
    window.location.replace("/signin");
  };

  return (
    <>
      <div className="md:flex-col md:min-w-full flex flex-col list-none">
        <div className="py-1 flex gap-2">
          <NextIcon name={FCIcons.FcButtingIn} className="" /> {auth?.email || auth?.phone}
        </div>
        <div className="grid grid-cols-3 gap-1">
          <Link href="/profile">
            <a className="hover:text-white hover:bg-primary-dark bg-primary-dark text-white text-sm py-1 text-center rounded">
              Profile
            </a>
          </Link>
          <button onClick={() => setOpen(true)}>Wallet</button>
          <button className="text-primary text-sm py-1 text-center rounded" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
      {isOpen && (
        <WalletSelectionModal
          {...{
            isOpen,
            setOpen,
          }}
        />
      )}
    </>
  );
};

export default AdminInfo;
