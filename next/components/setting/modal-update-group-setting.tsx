import { Dispatch, SetStateAction, useEffect, useState } from "react";
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
import {
  SettingGroup,
  SettingGroupArgNames,
  SettingGroupArgs,
  UpdateSettingGroupInput,
} from "../../lib/modules/setting-group/setting-group.model";
import { convertObjectNullToEmpty } from "../../lib/helpers/common.helper";
import { SettingGroupService } from "../../lib/modules/setting-group/setting-group.repo";

import NextIcon from "../../components-shared/next-icon";

const ModalUpdateGroupSetting = ({
  data,
  open,
  setOpen,
  loadData,
}: {
  data: SettingGroup;
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
    values: SettingGroup,
    { setSubmitting }: FormikHelpers<SettingGroup>
  ) => {
    updateData(values);

    setSubmitting(false);
    turnOffModal();
  };

  const updateData = (values: SettingGroup) => {
    setLoading(true)(dispatch);
    const token = getUserToken(false);
    const id = data.id;

    const params: UpdateSettingGroupInput = {
      name: values.name,
      desc: values.desc,
      icon: values.icon,
      readOnly: values.readOnly,
    };

    SettingGroupService.update({ id, data: params, token })
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
  };

  const getInitialValues = (params: SettingGroup) => {
    const data: SettingGroup = {
      ...convertObjectNullToEmpty(params),
    };
    return data;
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
      // width="450px"
      dialogClass="relative bg-white shadow-md rounded m-auto"
      isOpen={open}
      onClose={turnOffModal}
      mobileMode={false}
      title="Update Setting Group"
    >
      <Formik
        initialValues={getInitialValues(data)}
        validationSchema={validationSchema}
        onSubmit={submit}
      >
        {({ errors, touched, values }) => (
          <Form>
            <div className="p-3">
              <InputField
                labelName={SettingGroupArgNames.name}
                inputName={SettingGroupArgs.name}
                placeholder={`Input ${SettingGroupArgNames.name}`}
              />

              <InputField
                labelName={SettingGroupArgNames.desc}
                inputName={SettingGroupArgs.desc}
                placeholder={`Input ${SettingGroupArgNames.desc}`}
              />
              <div className="grid grid-cols-2 gap-2 items-center">
                <InputField
                  labelName={SettingGroupArgNames.icon}
                  inputName={SettingGroupArgs.icon}
                  placeholder={`Input ${SettingGroupArgNames.icon}`}
                />
                <NextIcon  name={values.icon} className="text-4xl mt-3" />
              </div>
              <div className="grid grid-cols-2 gap-2 items-center">
                <InputField
                  labelName={SettingGroupArgNames.slug}
                  inputName={SettingGroupArgs.slug}
                  placeholder={`Input ${SettingGroupArgNames.slug}`}
                  disabled
                />

                <CheckboxField
                  inputName={SettingGroupArgs.readOnly}
                  labelName={SettingGroupArgNames.readOnly}
                />
              </div>
            </div>
            <Actions />
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default ModalUpdateGroupSetting;

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
