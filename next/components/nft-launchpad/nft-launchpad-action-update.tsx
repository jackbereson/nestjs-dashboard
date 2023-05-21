import { useState } from "react";
import { NftLaunchpad } from "../../lib/modules/nft-launchpad/nft-launchpad.model";
import ModalUpdateNftLaunchpad from "./modal-update-nft-launchpad";

import NextIcon from "../../components-shared/next-icon";

type Model = NftLaunchpad;

const NftLaunchpadActionUpdate = ({
  data,
  loadData,
}: {
  data: Model;
  loadData: () => void;
}) => {
  const [open, setOpen] = useState(false);
  const openModal = () => {
    setOpen(true);
  };

  return (
    <>
      <button
        className="text-primary-dark hover:underline py-1 px-3 border-0 bg-none flex gap-1  items-center"
        onClick={openModal}
      >
        <NextIcon  name='FcEditImage' className="" /> Update
      </button>
      {open && (
        <ModalUpdateNftLaunchpad
          data={data}
          open={open}
          setOpen={setOpen}
          loadData={loadData}
        />
      )}
    </>
  );
};

export default NftLaunchpadActionUpdate;
