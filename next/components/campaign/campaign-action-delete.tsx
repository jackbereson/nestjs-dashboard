import { useState } from "react";
import { Campaign } from "../../lib/modules/campaign/campaign.model";
import ModalDeleteCampaign from "./modal-delete-campaign";

import NextIcon from "../../components-shared/next-icon";

type Model = Campaign;

const CampaignActionDelete = ({
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
        <ModalDeleteCampaign
          data={data}
          open={open}
          setOpen={setOpen}
          loadData={loadData}
        />
      )}
    </>
  );
};

export default CampaignActionDelete;
