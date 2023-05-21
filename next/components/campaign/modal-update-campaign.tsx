import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { Button } from "../../components-shared/shared/utilities/form/button";
import * as Yup from "yup";

import { getUserToken } from "../../lib/modules/user/user.model";
import { useDispatch, useSelector } from "../../redux/store";
import { setLoading } from "../../redux/actions/loading.action";
import {
  Campaign,
  CampaignArgNames,
  CampaignArgs,
  campaignStatusData,
  UpdateCampaignInput,
} from "../../lib/modules/campaign/campaign.model";
import { CampaignService } from "../../lib/modules/campaign/campaign.repo";
import { convertObjectNullToEmpty, formatDate } from "../../lib/helpers/common.helper";
// import { BaseModelArgNames, BaseModelArgs } from "../../lib/models/base-model.model";

import { useToast } from "../../providers/toast-provider";
import { Dialog } from "../../components-shared/shared/utilities/dialog/dialog";
import InputField, { InputType } from "../../components-shared/shared/formik/input-field";
import SelectField from "../../components-shared/shared/formik/select-field";
import CheckboxField from "../../components-shared/shared/formik/checkbox-field";
import DateField from "../../components-shared/shared/formik/date-field";
import RangeDateField from "../../components-shared/shared/formik/range-date-field";

const ModalUpdateCampaign = ({
  data,
  open,
  setOpen,
  loadData,
}: {
  data: Campaign;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  loadData?: () => void;
}) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const turnOffModal = () => {
    setOpen(!open);
  };

  const submit = (values: Campaign, { setSubmitting }: FormikHelpers<Campaign>) => {
    updateData(values);
    setSubmitting(false);
    turnOffModal();
  };

  const updateData = (values: Campaign) => {
    // console.log("---------params", params);
    setLoading(true)(dispatch);
    const token = getUserToken(false);
    const id = data.id;

    const params: UpdateCampaignInput = {
      name: values.name,
      endDate: values.endDate,
      startDate: values.startDate,
      maxTokenLimit: values.maxTokenLimit,
      priority: values.priority,
      ratioBNB: values.ratioBNB,
      minimumPurchaseTokenAmount: values.minimumPurchaseTokenAmount,
      maximumPurchaseTokenAmount: values.maximumPurchaseTokenAmount,
      status: values.status,
    };

    // console.log("params", params);

    CampaignService.update({ id, data: params, token })
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

  const getInitialValues = (params: Campaign) => {
    const data: Campaign = {
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
      title="Update campaign"
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
              <div className="grid grid-cols-2 gap-2 items-center">
                <SelectField
                  labelName="status"
                  inputName="status"
                  selectData={campaignStatusData}
                  // haveErrors={errors.status && touched.status}
                  // error={errors.status}
                />
                <CheckboxField
                  labelName={CampaignArgNames.is100PercentProgress}
                  inputName={CampaignArgs.is100PercentProgress}

                  // placeholder={`Input ${CampaignArgNames.name}`}
                  // haveErrors={errors.name && touched.name}
                  // error={errors.name}
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

export default ModalUpdateCampaign;

const validationSchema = Yup.object().shape({
  name: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
});
