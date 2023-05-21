import { Dispatch, SetStateAction } from "react";
import { useDispatch } from "../../redux/store";
import { useToast } from "../../providers/toast-provider";
import { setLoading } from "../../redux/actions/loading.action";
import {
  AlertDialog,
  AlertTypes,
} from "../../components-shared/shared/utilities/dialog/alert-dialog";
import { getUserToken } from "../../lib/modules/user/user.model";
import { Setting } from "../../lib/modules/setting/setting.model";
import { SettingService } from "../../lib/modules/setting/setting.repo";

const ModalDeleteSetting = ({
  data,
  open,
  setOpen,
  loadData,
}: {
  data: Setting;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  loadData?: () => void;
}) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const confirmDelete = () => {
    if(data.readOnly){
      toast.error("Data read only.");
      return;
    }
    setLoading(true)(dispatch);
    const token = getUserToken(false);
    const id = data.id;
    SettingService.delete({ id, token })
      .then(() => {
        loadData();
        setLoading(false)(dispatch);
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
      title="Delete Setting"
      content="Are you sure you want to delete this data ?"
    />
  );
};

export default ModalDeleteSetting;
