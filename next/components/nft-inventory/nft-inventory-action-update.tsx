import { useState } from "react";
import { NftInventory } from "../../lib/modules/nft-inventory/nft-inventory.model";
import ModalUpdateNftInventory from "./modal-update-nft-inventory";

import NextIcon from "../../components-shared/next-icon";

type Model = NftInventory;

const NftInventoryActionUpdate = ({
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
        <ModalUpdateNftInventory
          data={data}
          open={open}
          setOpen={setOpen}
          loadData={loadData}
        />
      )}
    </>
  );
};

export default NftInventoryActionUpdate;
