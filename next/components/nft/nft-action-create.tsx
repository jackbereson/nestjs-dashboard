import { useState } from "react";
import { classNames } from "../../lib/helpers/design";
import ModalCreateNft from "./modal-create-nft";

import NextIcon from "../../components-shared/next-icon";
import { Button } from "../../components-shared/shared/utilities/form/button";

const NftActionCreate = ({ loadData }: { loadData: () => void }) => {
  const [open, setOpen] = useState(false);
  const openModal = () => {
    setOpen(true);
  };

  return (
    <>
      <Button
        className={classNames(
          "w-8 h-9 rounded outline-none focus:outline-none",
          "mr-1 mb-1 ease-linear transition-all duration-150")}
        outline
        icon={<NextIcon  name='FcPlus' className="text-xl" />}
        onClick={openModal}
      />
      {open && <ModalCreateNft open={open} setOpen={setOpen} loadData={loadData} /> }
    </>
  );
};

export default NftActionCreate;
