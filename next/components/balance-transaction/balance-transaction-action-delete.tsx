import { useState } from "react";
import { BalanceTransaction } from "../../lib/modules/balance-transaction/balance-transaction.model";
import ModalDeleteBalanceTransaction from "./modal-delete-balance-transaction";

import NextIcon from "../../components-shared/next-icon";

type Model = BalanceTransaction;

const BalanceTransactionActionDelete = ({
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
        <ModalDeleteBalanceTransaction
          data={data}
          open={open}
          setOpen={setOpen}
          loadData={loadData}
        />
      )}
    </>
  );
};

export default BalanceTransactionActionDelete;
