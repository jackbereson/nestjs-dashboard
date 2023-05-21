import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { Button } from "../../components-shared/shared/utilities/form/button";
import * as Yup from "yup";
import InputField, { InputType } from "../../components-shared/shared/formik/input-field";
// import SelectField from "../../components/shared/formik/select-field";
// import ChecklistField from "../../components/shared/formik/checklist-field";
// import CheckboxField from "../../components/shared/formik/checkbox-field";
import { useDispatch } from "../../redux/store";
import { useToast } from "../../providers/toast-provider";
import { setLoading } from "../../redux/actions/loading.action";
import { Dialog } from "../../components-shared/shared/utilities/dialog/dialog";
import { UserService } from "../../lib/modules/user/user.repo";
import {
  getUserToken,
  ROLES,
  User,
  UserArgNames,
  UserArgs,
  userRoleData,
  userStatusData,
} from "../../lib/modules/user/user.model";
import SelectField from "../../components-shared/shared/formik/select-field";

const ModalUpdateUser = ({
  user,
  open,
  setOpen,
  loadData,
}: {
  user: User;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  loadData?: () => void;
}) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const turnOffModal = () => {
    setOpen(!open);
  };

  const submit = (values: any, { setSubmitting }: FormikHelpers<User>) => {
    updateData(values);

    setSubmitting(false);
    turnOffModal();
  };

  const updateData = (data: User) => {
    setLoading(true)(dispatch);
    if (data.password.trim() === "") {
      delete data.password;
    }
    const token = getUserToken(false);
    const id = user.id;
    UserService.update({ id, data, token })
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

  const initialValues = {
    name: user.name || "",
    email: user.email || "",
    password: "",
    walletAddress: user.walletAddress || "",
    role: user.role || ROLES.EDITOR,
    avatar: user.avatar || "",
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
      title="Update user"
    >
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submit}>
        {({ errors, touched, values }) => (
          <Form>
            <div className="p-3">
              <InputField
                labelName={UserArgNames.name}
                inputName={UserArgs.name}
                placeholder={`Input ${UserArgNames.name}`}
                // haveErrors={errors.name && touched.name}
                // error={errors.name}
              />
              <InputField
                labelName={UserArgNames.email}
                inputName={UserArgs.email}
                placeholder={`Input ${UserArgNames.email}`}
                // haveErrors={errors.name && touched.name}
                // error={errors.name}
              />
              <InputField
                labelName={UserArgNames.password}
                inputName={UserArgs.password}
                placeholder={`Input ${UserArgNames.password}`}
                // haveErrors={errors.name && touched.name}
                // error={errors.name}
              />
              <InputField
                labelName={UserArgNames.walletAddress}
                inputName={UserArgs.walletAddress}
                placeholder={`Input ${UserArgNames.walletAddress}`}
                // haveErrors={errors.name && touched.name}
                // error={errors.name}
              />
              <InputField
                labelName={UserArgNames.avatar}
                inputName={UserArgs.avatar}
                placeholder={`Input ${UserArgNames.avatar}`}
                // haveErrors={errors.name && touched.name}
                // error={errors.name}
              />
              <SelectField
                labelName={UserArgNames.role}
                inputName={UserArgs.role}
                placeholder={`Input ${UserArgNames.role}`}
                selectData={userRoleData}
                // haveErrors={errors.name && touched.name}
                // error={errors.name}
              />
              <SelectField
                labelName={UserArgNames.status}
                inputName={UserArgs.status}
                placeholder={`Input ${UserArgNames.status}`}
                selectData={userStatusData}
                // haveErrors={errors.name && touched.name}
                // error={errors.name}
              />
            </div>
            <Actions />
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default ModalUpdateUser;

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
