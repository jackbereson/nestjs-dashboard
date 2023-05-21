---
to: next/components/<%= h.changeCase.paramCase(name) %>/modal-create-<%= h.changeCase.paramCase(name) %>.tsx
---
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { Button } from "../../components-shared/shared/utilities/form/button";
import * as Yup from "yup";
import InputField, {
  // InputType,
} from "../../components-shared/shared/formik/input-field";
import { useDispatch } from "../../redux/store";
import { setLoading } from "../../redux/actions/loading.action";
import { getUserToken } from "../../lib/modules/user/user.model";

import {
  <%= h.inflection.camelize(name) %>ArgNames,
  <%= h.inflection.camelize(name) %>Args,
  <%= h.inflection.camelize(name) %>InitialValues,
  Create<%= h.inflection.camelize(name) %>Input,
} from "../../lib/modules/<%= h.changeCase.paramCase(name) %>/<%= h.changeCase.paramCase(name) %>.model";
import { <%= h.inflection.camelize(name) %>Service } from "../../lib/modules/<%= h.changeCase.paramCase(name) %>/<%= h.changeCase.paramCase(name) %>.repo";

import { useToast } from "../../providers/toast-provider";
import { Dialog } from "../../components-shared/shared/utilities/dialog/dialog";

const ModalCreate<%= h.inflection.camelize(name) %> = ({
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

  const submit = (
    values: Create<%= h.inflection.camelize(name) %>Input,
    { setSubmitting }: FormikHelpers<Create<%= h.inflection.camelize(name) %>Input>
  ) => {
    createData({...values});
    // alert(JSON.stringify(values, null, 2));
    setSubmitting(false);
    turnOffModal();
  };

  const createData = (data: Create<%= h.inflection.camelize(name) %>Input) => {
    setLoading(true)(dispatch);
    const token = getUserToken(false);
    <%= h.inflection.camelize(name) %>Service.create({ data, token })
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
      title="Create new <%= h.inflection.camelize(name, true) %>"
    >
      <Formik
        initialValues={<%= h.inflection.camelize(name) %>InitialValues}
        validationSchema={validationSchema}
        onSubmit={submit}
      >
        {({ errors, touched, values }) => (
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

export default ModalCreate<%= h.inflection.camelize(name) %>;

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});
