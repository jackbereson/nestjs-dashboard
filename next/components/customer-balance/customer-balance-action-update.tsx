import { useState } from "react";
import { CustomerBalance } from "../../lib/modules/customer-balance/customer-balance.model";
import ModalUpdateCustomerBalance from "./modal-update-customer-balance";

import NextIcon from "../../components-shared/next-icon";

type Model = CustomerBalance;

const CustomerBalanceActionUpdate = ({
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
        <ModalUpdateCustomerBalance
          data={data}
          open={open}
          setOpen={setOpen}
          loadData={loadData}
        />
      )}
    </>
  );
};

export default CustomerBalanceActionUpdate;
