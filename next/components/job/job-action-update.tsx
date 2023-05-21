import { useState } from "react";
import { AgendaJob } from "../../lib/modules/agenda/agenda-job.model";
import ModalUpdateJob from "./modal-update-job";

import NextIcon from "../../components-shared/next-icon";

const JobActionUpdate = ({
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
        <NextIcon  name='FcEditImage' className="" /> Update
      </button>
      {open && (
        <ModalUpdateJob
          data={data}
          open={open}
          setOpen={setOpen}
          loadData={loadData}
        />
      )}
    </>
  );
};

export default JobActionUpdate;
