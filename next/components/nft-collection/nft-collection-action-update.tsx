import { useState } from "react";
import { NftCollection } from "../../lib/modules/nft-collection/nft-collection.model";
import ModalUpdateNftCollection from "./modal-update-nft-collection";

import NextIcon from "../../components-shared/next-icon";

type Model = NftCollection;

const NftCollectionActionUpdate = ({
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
        <ModalUpdateNftCollection
          data={data}
          open={open}
          setOpen={setOpen}
          loadData={loadData}
        />
      )}
    </>
  );
};

export default NftCollectionActionUpdate;
