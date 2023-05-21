---
to: next/components/<%= h.changeCase.paramCase(name) %>/<%= h.changeCase.paramCase(name) %>-action-update.tsx
---
import { useState } from "react";
import { <%= h.inflection.camelize(name) %> } from "../../lib/modules/<%= h.changeCase.paramCase(name) %>/<%= h.changeCase.paramCase(name) %>.model";
import ModalUpdate<%= h.inflection.camelize(name) %> from "./modal-update-<%= h.changeCase.paramCase(name) %>";

import NextIcon from "../../components-shared/next-icon";

type Model = <%= h.inflection.camelize(name) %>;

const <%= h.inflection.camelize(name) %>ActionUpdate = ({
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
        <ModalUpdate<%= h.inflection.camelize(name) %>
          data={data}
          open={open}
          setOpen={setOpen}
          loadData={loadData}
        />
      )}
    </>
  );
};

export default <%= h.inflection.camelize(name) %>ActionUpdate;
