import { useState } from "react";
import { StakingInterest } from "../../lib/modules/staking-interest/staking-interest.model";
import ModalDeleteStakingInterest from "./modal-delete-staking-interest";

import NextIcon from "../../components-shared/next-icon";

type Model = StakingInterest;

const StakingInterestActionDelete = ({
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
        <ModalDeleteStakingInterest
          data={data}
          open={open}
          setOpen={setOpen}
          loadData={loadData}
        />
      )}
    </>
  );
};

export default StakingInterestActionDelete;
