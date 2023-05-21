---
to: next/components/<%= h.changeCase.paramCase(name) %>/modal-update-<%= h.changeCase.paramCase(name) %>.tsx
---
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { Button } from "../../components-shared/shared/utilities/form/button";
import * as Yup from "yup";

import { getUserToken } from "../../lib/modules/user/user.model";
import { useDispatch, useSelector } from "../../redux/store";
import { setLoading } from "../../redux/actions/loading.action";
import {
  <%= h.inflection.camelize(name) %>,
  <%= h.inflection.camelize(name) %>ArgNames,
  <%= h.inflection.camelize(name) %>Args,
  Update<%= h.inflection.camelize(name) %>Input,
} from "../../lib/modules/<%= h.changeCase.paramCase(name) %>/<%= h.changeCase.paramCase(name) %>.model";
import { <%= h.inflection.camelize(name) %>Service } from "../../lib/modules/<%= h.changeCase.paramCase(name) %>/<%= h.changeCase.paramCase(name) %>.repo";
import { convertObjectNullToEmpty } from "../../lib/helpers/common.helper";
import {
  BaseModelArgNames,
  BaseModelArgs,
} from "../../lib/models/base-model.model";

import { useToast } from "../../providers/toast-provider";
import { Dialog } from "../../components-shared/shared/utilities/dialog/dialog";
import InputField from "../../components-shared/shared/formik/input-field";


const ModalUpdate<%= h.inflection.camelize(name) %> = ({
  data,
  open,
  setOpen,
  loadData,
}: {
  data: <%= h.inflection.camelize(name) %>;
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
    values: <%= h.inflection.camelize(name) %>,
    { setSubmitting }: FormikHelpers<<%= h.inflection.camelize(name) %>>
  ) => {
    updateData(values);
    // alert(JSON.stringify(values, null, 2));
    setSubmitting(false);
    turnOffModal();
  };

  const updateData = (values: <%= h.inflection.camelize(name) %>) => {
    // console.log("---------params", params);
    setLoading(true)(dispatch);
    const token = getUserToken(false);
    const id = data.id;

    const params: Update<%= h.inflection.camelize(name) %>Input = {
      name: values.name,
    };

    <%= h.inflection.camelize(name) %>Service.update({ id, data: params, token })
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

  const getInitialValues = (params: <%= h.inflection.camelize(name) %>) => {
    const data: <%= h.inflection.camelize(name) %> = {
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
      width="450px"
      dialogClass="relative bg-white shadow-md rounded m-auto"
      isOpen={open}
      onClose={turnOffModal}
      mobileMode={false}
      title="Update <%= h.inflection.camelize(name, true) %>"
    >
      <Formik
        initialValues={getInitialValues(data)}
        validationSchema={validationSchema}
        onSubmit={submit}
      >
        {({ errors, touched, values, setFieldValue }) => (
          <Form>
            <div className="p-3">
              <InputField
                labelName={<%= h.inflection.camelize(name) %>ArgNames.name}
                inputName={<%= h.inflection.camelize(name) %>Args.name}
                placeholder={`Input ${<%= h.inflection.camelize(name) %>ArgNames.name}`}
                haveErrors={errors.name && touched.name}
                error={errors.name}
              />
            </div>

            <Actions />
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default ModalUpdate<%= h.inflection.camelize(name) %>;

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});
