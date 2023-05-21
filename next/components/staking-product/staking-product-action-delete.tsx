import { useState } from "react";
import { StakingProduct } from "../../lib/modules/staking-product/staking-product.model";
import ModalDeleteStakingProduct from "./modal-delete-staking-product";

import NextIcon from "../../components-shared/next-icon";

type Model = StakingProduct;

const StakingProductActionDelete = ({
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
        <ModalDeleteStakingProduct
          data={data}
          open={open}
          setOpen={setOpen}
          loadData={loadData}
        />
      )}
    </>
  );
};

export default StakingProductActionDelete;
