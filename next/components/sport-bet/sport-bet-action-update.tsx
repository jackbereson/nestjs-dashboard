import { useState } from "react";
import { SportBet } from "../../lib/modules/sport-bet/sport-bet.model";
import ModalUpdateSportBet from "./modal-update-sport-bet";

import NextIcon from "../../components-shared/next-icon";

type Model = SportBet;

const SportBetActionUpdate = ({
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
        <ModalUpdateSportBet
          data={data}
          open={open}
          setOpen={setOpen}
          loadData={loadData}
        />
      )}
    </>
  );
};

export default SportBetActionUpdate;
