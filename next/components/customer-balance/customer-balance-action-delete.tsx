import { useState } from "react";
import { CustomerBalance } from "../../lib/modules/customer-balance/customer-balance.model";
import ModalDeleteCustomerBalance from "./modal-delete-customer-balance";

import NextIcon from "../../components-shared/next-icon";

type Model = CustomerBalance;

const CustomerBalanceActionDelete = ({
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
        <ModalDeleteCustomerBalance
          data={data}
          open={open}
          setOpen={setOpen}
          loadData={loadData}
        />
      )}
    </>
  );
};

export default CustomerBalanceActionDelete;
