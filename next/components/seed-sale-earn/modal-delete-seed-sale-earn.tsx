import { Dispatch, SetStateAction } from "react";
import { useDispatch } from "../../redux/store";
import { useToast } from "../../providers/toast-provider";
import { setLoading } from "../../redux/actions/loading.action";
import {
  AlertDialog,
  AlertTypes,
} from "../../components-shared/shared/utilities/dialog/alert-dialog";
import { SeedSaleEarn } from "../../lib/modules/seed-sale-earn/seed-sale-earn.model";
import { SeedSaleEarnService } from "../../lib/modules/seed-sale-earn/seed-sale-earn.repo";
import { getUserToken } from "../../lib/modules/user/user.model";

const ModalDeleteSeedSaleEarn = ({
  data,
  open,
  setOpen,
  loadData,
}: {
  data: SeedSaleEarn;
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
    SeedSaleEarnService.delete({ id, token })
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
      title="Delete seedSaleEarn"
      content="Are you sure you want to delete this data ?"
    />
  );
};

export default ModalDeleteSeedSaleEarn;
