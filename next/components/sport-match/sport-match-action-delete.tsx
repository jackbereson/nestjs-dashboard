import { useState } from "react";
import { SportMatch } from "../../lib/modules/sport-match/sport-match.model";
import ModalDeleteSportMatch from "./modal-delete-sport-match";

import NextIcon from "../../components-shared/next-icon";

type Model = SportMatch;

const SportMatchActionDelete = ({
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
        <ModalDeleteSportMatch
          data={data}
          open={open}
          setOpen={setOpen}
          loadData={loadData}
        />
      )}
    </>
  );
};

export default SportMatchActionDelete;
