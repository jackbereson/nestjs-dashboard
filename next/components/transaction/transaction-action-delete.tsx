import { useState } from "react";
import { Transaction } from "../../lib/modules/transaction/transaction.model";
import ModalDeleteTransaction from "./modal-delete-transaction";

import NextIcon from "../../components-shared/next-icon";

type Model = Transaction;

const TransactionActionDelete = ({
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
        <ModalDeleteTransaction
          data={data}
          open={open}
          setOpen={setOpen}
          loadData={loadData}
        />
      )}
    </>
  );
};

export default TransactionActionDelete;
