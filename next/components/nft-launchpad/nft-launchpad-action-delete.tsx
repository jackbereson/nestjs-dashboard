import { useState } from "react";
import { NftLaunchpad } from "../../lib/modules/nft-launchpad/nft-launchpad.model";
import ModalDeleteNftLaunchpad from "./modal-delete-nft-launchpad";

import NextIcon from "../../components-shared/next-icon";

type Model = NftLaunchpad;

const NftLaunchpadActionDelete = ({
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
        <NextIcon  name='FcEmptyTrash' className="" /> Delete
      </button>
      {open && (
        <ModalDeleteNftLaunchpad
          data={data}
          open={open}
          setOpen={setOpen}
          loadData={loadData}
        />
      )}
    </>
  );
};

export default NftLaunchpadActionDelete;
