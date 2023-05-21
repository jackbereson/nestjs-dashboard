import { Dispatch, SetStateAction } from "react";
import { getUserToken } from "../../lib/modules/user/user.model";
import { useDispatch } from "../../redux/store";
import { useToast } from "../../providers/toast-provider";
import { setLoading } from "../../redux/actions/loading.action";
import {
  AlertDialog,
  AlertTypes,
} from "../../components-shared/shared/utilities/dialog/alert-dialog";
import { AgendaJobService } from "../../lib/modules/agenda/agenda-job.repo";
import { AgendaJob } from "../../lib/modules/agenda/agenda-job.model";

const ModalDeleteJob = ({
  job,
  open,
  setOpen,
  loadData,
}: {
  job: AgendaJob;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  loadData?: () => void;
}) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const confirmDelete = () => {
    setLoading(true)(dispatch);
    const token = getUserToken(false);
    const id = job.id;
    AgendaJobService.delete({ id, token })
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
      title="Delete agenda job"
      content="Are you sure you want to delete this data ?"
    />
  );
};

export default ModalDeleteJob;
