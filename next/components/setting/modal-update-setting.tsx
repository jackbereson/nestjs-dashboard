import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Formik, Form, FormikHelpers, Field } from "formik";
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
  Setting,
  SettingType,
  settingTypeData,
} from "../../lib/modules/setting/setting.model";
import { SettingService } from "../../lib/modules/setting/setting.repo";
import { getSettingGroups } from "../../redux/actions/setting-group.action";
import TextAreaField from "../../components-shared/shared/formik/text-area-field";

import ReactTagInput from "next-js-suggest-input";
import "next-js-suggest-input/build/react-tag-input.css";
import ArrayField from "../../components-shared/shared/formik/array-field";
import { parseArray, parseJSON } from "../../lib/helpers/common.helper";
import RichTextField from "../../components-shared/shared/formik/rich-text-field";

const ModalUpdateSetting = ({
  setting,
  open,
  setOpen,
}: {
  setting: Setting;
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
    values: Setting,
    { setSubmitting }: FormikHelpers<Setting>
  ) => {
    updateData(values);

    setSubmitting(false);
    turnOffModal();
  };

  const updateData = (values: Setting) => {
    setLoading(true)(dispatch);
    const token = getUserToken(false);
    const id = setting.id;

    const data: any = {
      name: values.name,
      key: values.key,
      isActive: values.isActive,
      isPrivate: values.isPrivate,
      type: values.type,
      value: values.value,
    };

    if (values.type === SettingType.object) {
      data.value = JSON.parse(values.value);
    }

    SettingService.update({ id, data, token })
      .then(() => {
        getSettingGroups()(dispatch);
        setLoading(false)(dispatch);
        toast.success("Modify data successfully.");
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false)(dispatch);
        toast.error("System error. Modify data unsuccessfully.");
      });
  };

  const initialValues: Setting = {
    key: setting.key,
    name: setting.name,
    value: setting.value,
    isActive: setting.isActive,
    isPrivate: setting.isPrivate,
    type: setting.type,
  };

  if (setting.type === SettingType.object) {
    initialValues.value = JSON.stringify(setting.value,null,"\t");
  }

  if (setting.type === SettingType.json) {
    initialValues.value = JSON.stringify(JSON.parse(setting.value),null,"\t");
  }

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
      title="Update Setting"
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
                  disabled
                />

                <InputField
                  labelName="name"
                  inputName="name"
                  placeholder="Input name"
                  readOnly={setting.readOnly}
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
                  value={values.value}
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
                  disabled={setting.readOnly}
                />

                <CheckboxField
                  labelName="isActive"
                  inputName="isActive"
                  disabled={setting.readOnly}
                />

                <CheckboxField
                  labelName="isPrivate"
                  inputName="isPrivate"
                  disabled={setting.readOnly}
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

export default ModalUpdateSetting;

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
