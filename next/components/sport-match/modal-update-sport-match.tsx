import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { Button } from "../../components-shared/shared/utilities/form/button";
import * as Yup from "yup";

import { getUserToken } from "../../lib/modules/user/user.model";
import { useDispatch, useSelector } from "../../redux/store";
import { setLoading } from "../../redux/actions/loading.action";
import {
  SportMatch,
  SportMatchArgNames,
  SportMatchArgs,
  sportMatchStatusData,
  UpdateSportMatchInput,
} from "../../lib/modules/sport-match/sport-match.model";
import { SportMatchService } from "../../lib/modules/sport-match/sport-match.repo";
import { convertObjectNullToEmpty } from "../../lib/helpers/common.helper";
import { BaseModelArgNames, BaseModelArgs } from "../../lib/models/base-model.model";

import { useToast } from "../../providers/toast-provider";
import { Dialog } from "../../components-shared/shared/utilities/dialog/dialog";
import InputField, { InputType } from "../../components-shared/shared/formik/input-field";
import SelectField from "../../components-shared/shared/formik/select-field";

const ModalUpdateSportMatch = ({
  data,
  open,
  setOpen,
  loadData,
}: {
  data: SportMatch;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  loadData?: () => void;
}) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const turnOffModal = () => {
    setOpen(!open);
  };

  const submit = (values: SportMatch, { setSubmitting }: FormikHelpers<SportMatch>) => {
    updateData(values);
    // alert(JSON.stringify(values, null, 2));
    setSubmitting(false);
    turnOffModal();
  };

  const updateData = (values: SportMatch) => {
    // console.log("---------params", params);
    setLoading(true)(dispatch);
    const token = getUserToken(false);
    const id = data.id;

    const params: UpdateSportMatchInput = {
      name: values.name,
      sideA: values.sideA,
      sideB: values.sideB,
      flagA: values.flagA,
      flagB: values.flagB,
      scoreA: values.scoreA,
      scoreB: values.scoreB,
      sport: values.sport,
      sportId: values.sportId,
      type: values.type,
      status: values.status,
      sportRadar: values.sportRadar,
      startTime: values.startTime,
      endTime: values.endTime,
      oddA: values.oddA,
      oddDraw: values.oddDraw,
      oddB: values.oddB,
    };

    SportMatchService.update({ id, data: params, token })
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

  const getInitialValues = (params: SportMatch) => {
    const data: SportMatch = {
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
      title="Update sportMatch"
    >
      <Formik
        initialValues={getInitialValues(data)}
        // validationSchema={validationSchema}
        onSubmit={submit}
      >
        {({ errors, touched, values, setFieldValue }) => (
          <Form>
            <div className="p-3">
              <InputField
                labelName={SportMatchArgNames.name}
                inputName={SportMatchArgs.name}
                placeholder={`Input ${SportMatchArgNames.name}`}
                // haveErrors={errors.name && touched.name}
                // error={errors.name}
              />
              <InputField
                labelName={SportMatchArgNames.sideA}
                inputName={SportMatchArgs.sideA}
                placeholder={`Input ${SportMatchArgNames.sideA}`}
                // haveErrors={errors.sideA && touched.sideA}
                // error={errors.sideA}
              />
              <InputField
                labelName={SportMatchArgNames.scoreA}
                inputName={SportMatchArgs.scoreA}
                inputType={InputType.number}
                placeholder={`Input ${SportMatchArgNames.scoreA}`}
                // haveErrors={errors.sideA && touched.sideA}
                // error={errors.sideA}
              />
              <InputField
                labelName={SportMatchArgNames.sideB}
                inputName={SportMatchArgs.sideB}
                placeholder={`Input ${SportMatchArgNames.sideB}`}
                // haveErrors={errors.name && touched.name}
                // error={errors.name}
              />

              <InputField
                labelName={SportMatchArgNames.scoreB}
                inputName={SportMatchArgs.scoreB}
                inputType={InputType.number}
                placeholder={`Input ${SportMatchArgNames.scoreB}`}
                // haveErrors={errors.name && touched.name}
                // error={errors.name}
              />

              <InputField
                labelName={SportMatchArgNames.sport}
                inputName={SportMatchArgs.sport}
                placeholder={`Input ${SportMatchArgNames.sport}`}
                // haveErrors={errors.name && touched.name}
                // error={errors.name}
              />

              <InputField
                labelName={SportMatchArgNames.type}
                inputName={SportMatchArgs.type}
                placeholder={`Input ${SportMatchArgNames.type}`}
                // haveErrors={errors.name && touched.name}
                // error={errors.name}
              />

              <InputField
                labelName={SportMatchArgNames.endTime}
                inputName={SportMatchArgs.endTime}
                placeholder={`Input ${SportMatchArgNames.endTime}`}
                // haveErrors={errors.name && touched.name}
                // error={errors.name}
              />

              <SelectField
                labelName={SportMatchArgNames.status}
                inputName={SportMatchArgs.status}
                selectData={sportMatchStatusData}
              />
            </div>

            <Actions />
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default ModalUpdateSportMatch;

const validationSchema = Yup.object().shape({
  name: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
});
