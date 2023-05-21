import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { Button } from "../../components-shared/shared/utilities/form/button";
import * as Yup from "yup";
import InputField, {
  InputType, // InputType,
} from "../../components-shared/shared/formik/input-field";
import { useDispatch } from "../../redux/store";
import { setLoading } from "../../redux/actions/loading.action";
import { getUserToken } from "../../lib/modules/user/user.model";

import {
  CampaignArgNames,
  CampaignArgs,
  CampaignInitialValues,
  CreateCampaignInput,
} from "../../lib/modules/campaign/campaign.model";
import { CampaignService } from "../../lib/modules/campaign/campaign.repo";

import { useToast } from "../../providers/toast-provider";
import { Dialog } from "../../components-shared/shared/utilities/dialog/dialog";
import RangeDateField from "../../components-shared/shared/formik/range-date-field";
import { formatDate } from "../../lib/helpers/common.helper";

const ModalCreateCampaign = ({
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
    values: CreateCampaignInput,
    { setSubmitting }: FormikHelpers<CreateCampaignInput>
  ) => {
    createData({ ...values });
    // alert(JSON.stringify(values, null, 2));
    setSubmitting(false);
    turnOffModal();
  };

  const createData = (data: CreateCampaignInput) => {
    setLoading(true)(dispatch);
    const token = getUserToken(false);
    CampaignService.create({ data, token })
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
      title="Create new campaign"
    >
      <Formik
        initialValues={CampaignInitialValues}
        validationSchema={validationSchema}
        onSubmit={submit}
      >
        {({ errors, touched, values, setFieldValue }) => (
          <Form>
            <div className="p-3">
              <InputField
                labelName={CampaignArgNames.name}
                inputName={CampaignArgs.name}
                placeholder={`Input ${CampaignArgNames.name}`}
                haveErrors={errors.name && touched.name}
                error={errors.name}
              />
              <RangeDateField
                labelName={`${CampaignArgNames.startDate} - ${CampaignArgNames.endDate}`}
                startDateValue={values[CampaignArgs.startDate]}
                endDateValue={values[CampaignArgs.endDate]}
                startDateInputName={CampaignArgs.startDate}
                endDateInputName={CampaignArgs.endDate}
                setFieldValue={setFieldValue}
                format={formatDate}
                // haveErrors={errors.date && touched.date}
                // error={errors.date}
              />
              <InputField
                labelName={CampaignArgNames.maxTokenLimit}
                inputName={CampaignArgs.maxTokenLimit}
                inputType={InputType.number}
                // placeholder={`Input ${CampaignArgNames.name}`}
                // haveErrors={errors.name && touched.name}
                // error={errors.name}
              />
              <InputField
                labelName={CampaignArgNames.ratioBNB}
                inputName={CampaignArgs.ratioBNB}
                inputType={InputType.number}
                // placeholder={`Input ${CampaignArgNames.name}`}
                // haveErrors={errors.name && touched.name}
                // error={errors.name}
              />
              <InputField
                labelName={CampaignArgNames.minimumPurchaseTokenAmount}
                inputName={CampaignArgs.minimumPurchaseTokenAmount}
                inputType={InputType.number}
                // placeholder={`Input ${CampaignArgNames.name}`}
                // haveErrors={errors.name && touched.name}
                // error={errors.name}
              />
              <InputField
                labelName={CampaignArgNames.maximumPurchaseTokenAmount}
                inputName={CampaignArgs.maximumPurchaseTokenAmount}
                inputType={InputType.number}
                // placeholder={`Input ${CampaignArgNames.name}`}
                // haveErrors={errors.name && touched.name}
                // error={errors.name}
              />
              <InputField
                labelName={CampaignArgNames.priority}
                inputName={CampaignArgs.priority}
                inputType={InputType.number}
                // placeholder={`Input ${CampaignArgNames.name}`}
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

export default ModalCreateCampaign;

const validationSchema = Yup.object().shape({
  name: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
});
