import { useState } from "react";
import ModalUpdateUser from "./modal-update-user";
import { User } from "../../lib/modules/user/user.model";

import NextIcon from "../../components-shared/next-icon";

const UserActionUpdate = ({
  data,
  loadData,
}: {
  data: User;
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
      <ModalUpdateUser
        user={data}
        open={open}
        setOpen={setOpen}
        loadData={loadData}
      />
    </>
  );
};

export default UserActionUpdate;
