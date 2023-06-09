import { useState } from "react";
import { SeedSaleEarn } from "../../lib/modules/seed-sale-earn/seed-sale-earn.model";
import ModalDeleteSeedSaleEarn from "./modal-delete-seed-sale-earn";

import NextIcon from "../../components-shared/next-icon";

type Model = SeedSaleEarn;

const SeedSaleEarnActionDelete = ({
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
        <ModalDeleteSeedSaleEarn
          data={data}
          open={open}
          setOpen={setOpen}
          loadData={loadData}
        />
      )}
    </>
  );
};

export default SeedSaleEarnActionDelete;
