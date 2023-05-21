import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { classNames } from "../lib/helpers/design";
import { Customer } from "../lib/modules/customer/customer.model";
import { CustomerWalletType, customerWalletTypeData } from "../lib/modules/wallet/wallet.model";
import { useToast } from "../providers/toast-provider";
import { useWeb3js } from "../providers/web3-provider";
import { setLoading } from "../redux/actions/loading.action";
import { useDispatch } from "../redux/store";
import { AlertDialog, AlertTypes } from "./shared/utilities/dialog/alert-dialog";
import { Dialog } from "./shared/utilities/dialog/dialog";
import { Button } from "./shared/utilities/form/button";

const WalletSelectionModal = ({ isOpen, setOpen }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const toast = useToast();

  const { connectMetamask } = useWeb3js();
  const { checkWalletInstalled, currentAccount } = useWeb3js();

  const [currentType, setCurrentType] = useState<CustomerWalletType>();
  const [notInstalledWalletOpen, setNotInstalledWalletOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState<any>();
  const onCloseNotInstalledWalletModal = () => {
    setNotInstalledWalletOpen(false);
  };

  const onClose = () => {
    setOpen(false);
  };

  const connectWallet = (type: CustomerWalletType) => {
    // console.log("checkWalletInstalled(type)", checkWalletInstalled(type));
    if (!checkWalletInstalled(type)) {
      const wallet = customerWalletTypeData?.find((wallet) => wallet.code === type);
      setAlertTitle(
        <>
          Cannot connect to your {wallet?.name} wallet. Please make sure you have{" "}
          <a href={wallet?.downloadUrl} target="_blank" className="mr-2 text-danger">
            {wallet.name} Extension
          </a>
          installed.
        </>
      );
      setNotInstalledWalletOpen(true);
      return;
    }

    setCurrentType(type);
    switch (type) {
      case CustomerWalletType.METAMASK:
        connectMetamask(toast);
        break;
      default:
        break;
    }
    onClose();
  };

  return (
    <Dialog
      width="450px"
      dialogClass="relative bg-white shadow-md rounded m-auto"
      isOpen={isOpen}
      onClose={onClose}
      title="Connect to a wallet"
    >
      <div className="py-10 px-5 grid grid-cols-2 gap-2">
        {customerWalletTypeData?.map((wallet, k) => {
          return (
            <Button
              primary
              className={classNames("w-full px-0 py-3 mb-3 gap-2 shadow", "")}
              key={k}
              onClick={() => connectWallet(wallet?.code)}
            >
              {wallet?.name}
              <img src={wallet?.icon} className="h-7" />
            </Button>
          );
        })}
      </div>
      <Dialog.Footer>Learn how to connect ?</Dialog.Footer>
      <AlertDialog
        isOpen={notInstalledWalletOpen}
        onClose={onCloseNotInstalledWalletModal}
        onConfirm={onCloseNotInstalledWalletModal}
        type={AlertTypes.error}
        title="Error"
        confirmText="Ok"
        content={alertTitle}
      />
    </Dialog>
  );
};

export default WalletSelectionModal;
