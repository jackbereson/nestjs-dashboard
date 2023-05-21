---
to: next/components/<%= h.changeCase.paramCase(name) %>/modal-delete-<%= h.changeCase.paramCase(name) %>.tsx
---
import { Dispatch, SetStateAction } from "react";
import { useDispatch } from "../../redux/store";
import { useToast } from "../../providers/toast-provider";
import { setLoading } from "../../redux/actions/loading.action";
import {
  AlertDialog,
  AlertTypes,
} from "../../components-shared/shared/utilities/dialog/alert-dialog";
import { <%= h.inflection.camelize(name) %> } from "../../lib/modules/<%= h.changeCase.paramCase(name) %>/<%= h.changeCase.paramCase(name) %>.model";
import { <%= h.inflection.camelize(name) %>Service } from "../../lib/modules/<%= h.changeCase.paramCase(name) %>/<%= h.changeCase.paramCase(name) %>.repo";
import { getUserToken } from "../../lib/modules/user/user.model";

const ModalDelete<%= h.inflection.camelize(name) %> = ({
  data,
  open,
  setOpen,
  loadData,
}: {
  data: <%= h.inflection.camelize(name) %>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  loadData?: () => void;
}) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const confirmDelete = () => {
    setLoading(true)(dispatch);
    const token = getUserToken(false);
    const id = data.id;
    <%= h.inflection.camelize(name) %>Service.delete({ id, token })
      .then(() => {
        loadData();
        toast.success("Modify data successfully.");
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false)(dispatch);
        toast.error("System error. Modify data unsuccessfully.");
      });
    closeModal();
  };

  const closeModal = () => {
    setOpen(!open);
  };

  return (
    <AlertDialog
      isOpen={open}
      type={AlertTypes.question}
      onConfirm={confirmDelete}
      onClose={closeModal}
      title="Delete <%= h.inflection.camelize(name, true) %>"
      content="Are you sure you want to delete this data ?"
    />
  );
};

export default ModalDelete<%= h.inflection.camelize(name) %>;
