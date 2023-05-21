---
to: next/components/<%= h.changeCase.paramCase(name) %>/<%= h.changeCase.paramCase(name) %>-action-create.tsx
---
import { useState } from "react";
import { classNames } from "../../lib/helpers/design";
import ModalCreate<%= h.inflection.camelize(name) %> from "./modal-create-<%= h.changeCase.paramCase(name) %>";

import NextIcon from "../../components-shared/next-icon";
import { Button } from "../../components-shared/shared/utilities/form/button";

const <%= h.inflection.camelize(name) %>ActionCreate = ({ loadData }: { loadData: () => void }) => {
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
      {open && <ModalCreate<%= h.inflection.camelize(name) %> open={open} setOpen={setOpen} loadData={loadData} /> }
    </>
  );
};

export default <%= h.inflection.camelize(name) %>ActionCreate;
