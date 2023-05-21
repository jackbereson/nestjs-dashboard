import { useState } from "react";
import { AgendaJob } from "../../lib/modules/agenda/agenda-job.model";
import ModalDeleteJob from "./modal-delete-job";

import NextIcon from "../../components-shared/next-icon";

const JobActionDelete = ({
  data,
  loadData,
}: {
  data: AgendaJob;
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
        <ModalDeleteJob
          job={data}
          open={open}
          setOpen={setOpen}
          loadData={loadData}
        />
      )}
    </>
  );
};

export default JobActionDelete;
