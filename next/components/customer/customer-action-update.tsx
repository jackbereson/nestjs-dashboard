import { useState } from "react";
import { Customer } from "../../lib/modules/customer/customer.model";
import ModalUpdateCustomer from "./modal-update-customer";

import NextIcon from "../../components-shared/next-icon";

type Model = Customer;

const CustomerActionUpdate = ({
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
        <ModalUpdateCustomer
          data={data}
          open={open}
          setOpen={setOpen}
          loadData={loadData}
        />
      )}
    </>
  );
};

export default CustomerActionUpdate;
