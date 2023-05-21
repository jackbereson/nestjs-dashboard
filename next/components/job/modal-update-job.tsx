import { Dispatch, SetStateAction } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { Button } from "../../components-shared/shared/utilities/form/button";
import * as Yup from "yup";
import InputField, {
  InputType,
} from "../../components-shared/shared/formik/input-field";
// import SelectField from "../../components/shared/formik/select-field";
// import ChecklistField from "../../components/shared/formik/checklist-field";
import CheckboxField from "../../components-shared/shared/formik/checkbox-field";
import { getUserToken } from "../../lib/modules/user/user.model";
import { useDispatch, useSelector } from "../../redux/store";
import { useToast } from "../../providers/toast-provider";
import { setLoading } from "../../redux/actions/loading.action";
import { Dialog } from "../../components-shared/shared/utilities/dialog/dialog";
import { AgendaJobService } from "../../lib/modules/agenda/agenda-job.repo";
import {
  AgendaJob,
  UpdateAgendaJobInput,
} from "../../lib/modules/agenda/agenda-job.model";

type DataType = AgendaJob;
type UpdateType = UpdateAgendaJobInput;
const Service = AgendaJobService;

const ModalUpdateJob = ({
  data,
  open,
  setOpen,
  loadData,
}: {
  data: DataType;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  loadData?: () => void;
}) => {

  const dispatch = useDispatch();
  const toast = useToast();

  const turnOffModal = () => {
    setOpen(!open);
  };

  const submit = (
    values: DataType,
    { setSubmitting }: FormikHelpers<DataType>
  ) => {
    updateData(values);
    
    setSubmitting(false);turnOffModal();
  };

  const updateData = (values: DataType) => {
    setLoading(true)(dispatch);
    const token = getUserToken(false);
    const id = data.id;
    const updatedData: UpdateType = {
      disabled: values.disabled,
      priority: values.priority,
    };
    Service.update({ id, data: updatedData, token })
      .then(() => {
        loadData();
        toast.success("Modify data successfully.");
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false)(dispatch);
        toast.error("System error. Modify data unsuccessfully.");
      });
  };

  const initialValues: any = {
    name: data.name || "",
    priority: data.priority || 0,
    disabled: data.disabled || false,
  };

  const Actions = () => {
    return (
      <div className="relative flex justify-end p-4 pb-3 pt-2 bg-white z-10 border-t border-gray-3 rounded-b">
        <Button
          submit={false}
          onClick={turnOffModal}
          className="btn-large px-8 mr-2"
          large
          hoverDarken
        >
          Cancel
        </Button>

        <Button submit={true} className="btn-large px-8" primary asyncLoading>
          Save
        </Button>
      </div>
    );
  };

  return (
    <Dialog
      width="450px"
      dialogClass="relative bg-white shadow-md rounded m-auto"
      isOpen={open}
      onClose={turnOffModal}
      mobileMode={false}
      title="Update Single bet"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submit}
      >
        {({ errors, touched, values }) => (
          <Form>
            <div className="p-3">
              <InputField
                labelName="Name"
                inputName="name"
                placeholder="Input name"
                readOnly
              />
              <div className="grid grid-cols-2 gap-2 items-center">
                <InputField
                  labelName="Priority"
                  inputName="priority"
                  inputType={InputType.number}
                  placeholder="Input priority"
                />
                <CheckboxField labelName="Disabled" inputName="disabled" />
              </div>
            </div>
            <Actions />
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default ModalUpdateJob;

const validationSchema = Yup.object().shape({
  // name: Yup.string()
  //   .min(2, "Too Short!")
  //   .max(50, "Too Long!")
  //   .required("Required"),
  // description: Yup.string()
  //   .min(2, "Too Short!")
  //   .max(50, "Too Long!")
  //   .required("Required"),
  // prize: Yup.string()
  //   .min(2, "Too Short!")
  //   .max(50, "Too Long!")
  //   .required("Required"),
});
