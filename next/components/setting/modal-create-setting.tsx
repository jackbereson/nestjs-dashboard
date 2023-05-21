import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { Button } from "../../components-shared/shared/utilities/form/button";
import * as Yup from "yup";

import InputField, {
  InputType,
} from "../../components-shared/shared/formik/input-field";
import SelectField from "../../components-shared/shared/formik/select-field";
import ChecklistField from "../../components-shared/shared/formik/checklist-field";
import CheckboxField from "../../components-shared/shared/formik/checkbox-field";
import { getUserToken } from "../../lib/modules/user/user.model";
import { useDispatch, useSelector } from "../../redux/store";
import { useToast } from "../../providers/toast-provider";
import { setLoading } from "../../redux/actions/loading.action";
import { Dialog } from "../../components-shared/shared/utilities/dialog/dialog";
import {
  CreateSettingInput,
  Setting,
  SettingType,
  settingTypeData,
} from "../../lib/modules/setting/setting.model";
import { SettingService } from "../../lib/modules/setting/setting.repo";
import { SettingGroup } from "../../lib/modules/setting-group/setting-group.model";
import TextAreaField from "../../components-shared/shared/formik/text-area-field";
import ArrayField from "../../components-shared/shared/formik/array-field";
import RichTextField from "../../components-shared/shared/formik/rich-text-field";

const ModalCreateSetting = ({
  open,
  setOpen,
  settingGroup,
  loadData,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  settingGroup: SettingGroup;
  loadData?: () => void;
}) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const turnOffModal = () => {
    setOpen(!open);
  };

  const submit = (
    values: Setting,
    { setSubmitting }: FormikHelpers<Setting>
  ) => {
    createData(values);
    setSubmitting(false);
    turnOffModal();
  };

  const createData = (values) => {
    setLoading(true)(dispatch);
    const token = getUserToken(false);

    const data: CreateSettingInput = {
      groupId: values.groupId,
      isActive: values.isActive,
      isPrivate: values.isPrivate,
      key: values.key,
      name: values.name,
      readOnly: values.readOnly,
      type: values.type,
      value: values.value,
    };

    if (values.type === SettingType.object) {
      data.value = JSON.parse(values.value);
    }

    SettingService.create({ data, token })
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

  const initialValues: CreateSettingInput = {
    type: SettingType.string,
    name: "",
    key: "",
    value: "",
    isActive: true,
    isPrivate: true,
    readOnly: false,
    groupId: settingGroup.id,
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
      title="Create Setting"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submit}
      >
        {({ errors, touched, values, setFieldValue }) => (
          <Form>
            <div className="p-3">
              <div className="grid grid-cols-2 gap-2">
                <InputField
                  labelName="key"
                  inputName="key"
                  placeholder="Input key"
                />

                <InputField
                  labelName="name"
                  inputName="name"
                  placeholder="Input name"
                />
              </div>

              {values.type === SettingType.json && (
                <TextAreaField
                  labelName="Value"
                  inputName="value"
                  placeholder="Input value"
                  value={values.value}
                  rows="15"
                />
              )}

              {values.type === SettingType.object && (
                <TextAreaField
                  labelName="Value"
                  inputName="value"
                  placeholder="Input value"
                  value={JSON.stringify(values.value)}
                  rows="15"
                />
              )}

              {values.type === SettingType.boolean && (
                <CheckboxField
                  labelName="Value"
                  inputName="value"
                  frontPosition
                />
              )}

              {values.type === SettingType.richText && (
                <RichTextField
                  labelName="Value"
                  inputName="value"
                  placeholder="Input value"
                  value={values.value}
                  setFieldValue={setFieldValue}
                />
              )}
              {values.type === SettingType.string && (
                <InputField
                  labelName="Value"
                  inputName="value"
                  placeholder="Input value"
                />
              )}
              {values.type === SettingType.number && (
                <InputField
                  labelName="Value"
                  inputName="value"
                  placeholder="Input value"
                  inputType={InputType.number}
                />
              )}

              {values.type === SettingType.array && (
                <ArrayField
                  labelName="Value"
                  inputName="value"
                  value={values.value}
                  setFieldValue={setFieldValue}
                />
              )}

              <div className="grid grid-cols-2 gap-2 items-center">
                <SelectField
                  labelName="type"
                  inputName="type"
                  placeholder="Input type"
                  selectData={settingTypeData}
                />

                <CheckboxField labelName="isActive" inputName="isActive" />
              </div>
              <div className="grid grid-cols-2 gap-2 items-center">
                <CheckboxField labelName="isPrivate" inputName="isPrivate" />

                <CheckboxField labelName="readOnly" inputName="readOnly" />
              </div>
            </div>
            <Actions />
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default ModalCreateSetting;

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
