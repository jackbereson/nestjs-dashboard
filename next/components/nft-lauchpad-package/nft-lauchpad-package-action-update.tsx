import { useState } from "react";
import { NftLauchpadPackage } from "../../lib/modules/nft-lauchpad-package/nft-lauchpad-package.model";
import ModalUpdateNftLauchpadPackage from "./modal-update-nft-lauchpad-package";

import NextIcon from "../../components-shared/next-icon";

type Model = NftLauchpadPackage;

const NftLauchpadPackageActionUpdate = ({
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
        <ModalUpdateNftLauchpadPackage
          data={data}
          open={open}
          setOpen={setOpen}
          loadData={loadData}
        />
      )}
    </>
  );
};

export default NftLauchpadPackageActionUpdate;
