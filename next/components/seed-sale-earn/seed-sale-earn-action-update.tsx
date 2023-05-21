import { useState } from "react";
import { SeedSaleEarn } from "../../lib/modules/seed-sale-earn/seed-sale-earn.model";
import ModalUpdateSeedSaleEarn from "./modal-update-seed-sale-earn";

import NextIcon from "../../components-shared/next-icon";

type Model = SeedSaleEarn;

const SeedSaleEarnActionUpdate = ({
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
        <ModalUpdateSeedSaleEarn
          data={data}
          open={open}
          setOpen={setOpen}
          loadData={loadData}
        />
      )}
    </>
  );
};

export default SeedSaleEarnActionUpdate;
