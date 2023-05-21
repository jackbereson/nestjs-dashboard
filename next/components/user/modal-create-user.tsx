import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { Button } from "../../components-shared/shared/utilities/form/button";
import * as Yup from "yup";
import InputField from "../../components-shared/shared/formik/input-field"; // InputType,
import { useDispatch } from "../../redux/store";
import { setLoading } from "../../redux/actions/loading.action";
import {
  CreateUserInput,
  getUserToken,
  UserArgNames,
  UserArgs,
  UserInitialValues,
  userRoleData,
} from "../../lib/modules/user/user.model";

import { useToast } from "../../providers/toast-provider";
import { Dialog } from "../../components-shared/shared/utilities/dialog/dialog";
import SelectField from "../../components-shared/shared/formik/select-field";
import TextAreaField from "../../components-shared/shared/formik/text-area-field";
import { UserService } from "../../lib/modules/user/user.repo";
// import CheckboxField from "../../components-shared/shared/formik/checkbox-field";

const ModalCreateUser = ({
  open,
  setOpen,
  loadData,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  loadData: () => void;
}) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const turnOffModal = () => {
    setOpen(!open);
  };

  const submit = (values: CreateUserInput, { setSubmitting }: FormikHelpers<CreateUserInput>) => {
    createData({ ...values });
    // alert(JSON.stringify(values, null, 2));
    setSubmitting(false);
    turnOffModal();
  };

  const createData = (data: CreateUserInput) => {
    setLoading(true)(dispatch);
    const token = getUserToken(false);
    UserService.create({ data, token })
      .then(() => {
        loadData();
        toast.success("Create data successfully.");
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false)(dispatch);
        toast.error("System error. Modify data unsuccessfully.");
      });
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
      title="Create new user"
    >
      <Formik
        initialValues={UserInitialValues}
        validationSchema={validationSchema}
        onSubmit={submit}
      >
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
            </div>
            <Actions />
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default ModalCreateUser;

const validationSchema = Yup.object().shape({
  // name: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
});

//wss://apis.ankr.com/wss/50e46664cc2f45fb80a03e4871fcd8f5/03f8157f280432616ef47da67c6ea8e2/binance/full/test
