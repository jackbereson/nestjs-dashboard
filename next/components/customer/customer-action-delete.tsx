import { useState } from "react";
import { Customer } from "../../lib/modules/customer/customer.model";
import ModalDeleteCustomer from "./modal-delete-customer";

import NextIcon from "../../components-shared/next-icon";

type Model = Customer;

const CustomerActionDelete = ({
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
        <ModalDeleteCustomer
          data={data}
          open={open}
          setOpen={setOpen}
          loadData={loadData}
        />
      )}
    </>
  );
};

export default CustomerActionDelete;
