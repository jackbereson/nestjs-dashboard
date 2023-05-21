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
import { SettingGroupService } from "../../lib/modules/setting-group/setting-group.repo";

const ModalResetSettingGroup = ({
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

  const confirm = () => {
    setLoading(true)(dispatch);
    const token = getUserToken(false);
    const id = data.id;
    SettingGroupService.resetSettingGroup({ id, token })
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
      onConfirm={confirm}
      onClose={closeModal}
      title="Reset Setting"
      content="Are you sure you want to reset this group ?"
    />
  );
};

export default ModalResetSettingGroup;
