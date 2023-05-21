import { useState } from "react";
import { NftLauchpadPackage } from "../../lib/modules/nft-lauchpad-package/nft-lauchpad-package.model";
import ModalDeleteNftLauchpadPackage from "./modal-delete-nft-lauchpad-package";

import NextIcon from "../../components-shared/next-icon";

type Model = NftLauchpadPackage;

const NftLauchpadPackageActionDelete = ({
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
        <ModalDeleteNftLauchpadPackage
          data={data}
          open={open}
          setOpen={setOpen}
          loadData={loadData}
        />
      )}
    </>
  );
};

export default NftLauchpadPackageActionDelete;
