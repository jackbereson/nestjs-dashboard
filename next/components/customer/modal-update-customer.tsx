import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { Button } from "../../components-shared/shared/utilities/form/button";
import * as Yup from "yup";

import { getUserToken } from "../../lib/modules/user/user.model";
import { useDispatch, useSelector } from "../../redux/store";
import { setLoading } from "../../redux/actions/loading.action";
import {
  Customer,
  CustomerArgNames,
  CustomerArgs,
  customerStatusData,
  UpdateCustomerInput,
} from "../../lib/modules/customer/customer.model";
import { CustomerService } from "../../lib/modules/customer/customer.repo";
import { convertObjectNullToEmpty } from "../../lib/helpers/common.helper";
import { BaseModelArgNames, BaseModelArgs } from "../../lib/models/base-model.model";

import { useToast } from "../../providers/toast-provider";
import { Dialog } from "../../components-shared/shared/utilities/dialog/dialog";
import InputField from "../../components-shared/shared/formik/input-field";
import SelectField from "../../components-shared/shared/formik/select-field";
// import { CustomerTypeService } from "../../lib/modules/customer-type/customer-type.repo";

const ModalUpdateCustomer = ({
  data,
  open,
  setOpen,
  loadData,
}: {
  data: Customer;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  loadData?: () => void;
}) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [customerTypes, setCustomerTypes] = useState<any>();

  useEffect(() => {
    // loadCustomerTypes();
  }, []);

  // const loadCustomerTypes = () => {
  //   const token = getUserToken(false);
  //   CustomerTypeService.getAll({ token })
  //     .then((res) => {
  //       const types = res.data.map((val) => ({
  //         value: val.id,
  //         name: val.name,
  //       }));
  //       setCustomerTypes(types);
  //     })
  //     .catch((error: Error) => {
  //       console.log("error", error);
  //       toast.error(error.message);
  //     });
  // };

  const turnOffModal = () => {
    setOpen(!open);
  };

  const submit = (values: Customer, { setSubmitting }: FormikHelpers<Customer>) => {
    updateData(values);
    setSubmitting(false);
    turnOffModal();
  };

  const updateData = (values: Customer) => {
    console.log("---------params", values);
    // setLoading(true)(dispatch);
    const token = getUserToken(false);
    const id = data.id;

    const params: any = {
      status: values.status,
    };

    // console.log("params", params);

    CustomerService.update({ id, data: params, token })
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

  const getInitialValues = (params: Customer) => {
    const data: Customer = {
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

        <Button submit={true} className="btn-large px-8" primary>
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
      title="Update customer"
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
                labelName={CustomerArgNames.address}
                inputName={CustomerArgs.address}
                placeholder={`Input ${CustomerArgNames.address}`}
                haveErrors={errors.address && touched.address}
                error={errors.address}
                readOnly
              />
              <InputField
                labelName={CustomerArgNames.email}
                inputName={CustomerArgs.email}
                placeholder={`Input ${CustomerArgNames.email}`}
                haveErrors={errors.email && touched.email}
                error={errors.email}
                readOnly
              />
              <InputField
                labelName={CustomerArgNames.walletType}
                inputName={CustomerArgs.walletType}
                placeholder={`Input ${CustomerArgNames.walletType}`}
                readOnly
                // haveErrors={errors.walletType && touched.walletType}
                // error={errors.walletType}
              />
              <InputField
                labelName={CustomerArgNames.addressIp}
                inputName={CustomerArgs.addressIp}
                placeholder={`Input ${CustomerArgNames.addressIp}`}
                readOnly
                // haveErrors={errors.addressIp && touched.addressIp}
                // error={errors.addressIp}
              />

              <SelectField
                labelName={CustomerArgNames.status}
                inputName={CustomerArgs.status}
                selectData={customerStatusData}
              />
              {/* <SelectField
                labelName={CustomerArgNames.customerType}
                inputName={CustomerArgs.customerTypeId}
                selectData={customerTypes}
              /> */}
            </div>

            <Actions />
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default ModalUpdateCustomer;

const validationSchema = Yup.object().shape({
  // name: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
});
