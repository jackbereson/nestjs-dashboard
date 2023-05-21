import { useState } from "react";
import { SportBet } from "../../lib/modules/sport-bet/sport-bet.model";
import ModalDeleteSportBet from "./modal-delete-sport-bet";

import NextIcon from "../../components-shared/next-icon";

type Model = SportBet;

const SportBetActionDelete = ({
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
        <ModalDeleteSportBet
          data={data}
          open={open}
          setOpen={setOpen}
          loadData={loadData}
        />
      )}
    </>
  );
};

export default SportBetActionDelete;
