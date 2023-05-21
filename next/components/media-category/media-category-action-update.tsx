import { useState } from "react";
import { MediaCategory } from "../../lib/modules/media-category/media-category.model";
import ModalUpdateMediaCategory from "./modal-update-media-category";

import NextIcon from "../../components-shared/next-icon";

type Model = MediaCategory;

const MediaCategoryActionUpdate = ({
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
        <ModalUpdateMediaCategory
          data={data}
          open={open}
          setOpen={setOpen}
          loadData={loadData}
        />
      )}
    </>
  );
};

export default MediaCategoryActionUpdate;
