import { useState } from "react";
import { NftInventory } from "../../lib/modules/nft-inventory/nft-inventory.model";
import ModalDeleteNftInventory from "./modal-delete-nft-inventory";

import NextIcon from "../../components-shared/next-icon";

type Model = NftInventory;

const NftInventoryActionDelete = ({
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
        <ModalDeleteNftInventory
          data={data}
          open={open}
          setOpen={setOpen}
          loadData={loadData}
        />
      )}
    </>
  );
};

export default NftInventoryActionDelete;
