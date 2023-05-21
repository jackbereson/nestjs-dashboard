import { Formik, FormikHelpers, Form } from "formik";
import { convertObjectNullToEmpty } from "../../lib/helpers/common.helper";
import { User, UserArgNames, UserArgs } from "../../lib/modules/user/user.model";
import * as Yup from "yup";
import InputField from "../../components-shared/shared/formik/input-field";
import DateField from "../../components-shared/shared/formik/date-field";

const CardProfileUpdate = ({ user }: { user: User }) => {
  const getInitialValues = (params: User) => {
    const data: User = {
      ...convertObjectNullToEmpty(params),
    };
    return data;
  };

  const submit = (values: User, { setSubmitting }: FormikHelpers<User>) => {
    // updateData(values);
    // alert(JSON.stringify(values, null, 2));
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={getInitialValues(user)}
      validationSchema={validationSchema}
      onSubmit={submit}
    >
      {({ errors, touched, values, setFieldValue }) => (
        <Form>
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
            <div className="rounded-t bg-gray-200 mb-0 px-4 py-4">
              <div className="text-center flex justify-between">
                <h6 className="text-gray-700 text-xl font-bold">My account</h6>
                <button
                  className="bg-pink-700 active:bg-blue-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  Settings
                </button>
              </div>
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <form>
                <h6 className="text-gray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  User Information
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4">
                    <InputField
                      labelName={UserArgNames.name}
                      inputName={UserArgs.name}
                      placeholder={`Input ${UserArgNames.name}`}
                      haveErrors={errors.name && touched.name}
                      error={errors.name}
                    />
                  </div>
                  {/* <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <InputField
                        labelName={UserArgNames.agencyName}
                        inputName={UserArgs.agencyName}
                        placeholder={`Input ${UserArgNames.agencyName}`}
                        // haveErrors={errors.agencyName && touched.agencyName}
                        // error={errors.agencyName}
                      />
                    </div>
                  </div> */}
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <InputField
                        labelName={UserArgNames.email}
                        inputName={UserArgs.email}
                        placeholder={`Input ${UserArgNames.email}`}
                        haveErrors={errors.email && touched.email}
                        error={errors.email}
                      />
                    </div>
                  </div>
                  {/* <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <InputField
                        labelName={UserArgNames.phone}
                        inputName={UserArgs.phone}
                        placeholder={`Input ${UserArgNames.phone}`}
                        haveErrors={errors.phone && touched.phone}
                        error={errors.phone}
                      />
                    </div>
                  </div> */}

                  {/* <div className="w-full lg:w-6/12 px-4">
                    <InputField
                      labelName={UserArgNames.address}
                      inputName={UserArgs.address}
                      placeholder={`Input ${UserArgNames.address}`}
                      haveErrors={errors.address && touched.address}
                      error={errors.address}
                    />
                  </div> */}
                </div>

                <hr className="mt-6 border-b-1 border-blueGray-300" />

                <h6 className="text-gray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Service Information
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4">
                    <InputField
                      labelName={UserArgNames.code}
                      inputName={UserArgs.code}
                      placeholder={`Input ${UserArgNames.code}`}
                      disabled
                    />
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <InputField
                      labelName={UserArgNames.serviceStatus}
                      inputName={UserArgs.serviceStatus}
                      placeholder={`Input ${UserArgNames.serviceStatus}`}
                      disabled
                    />
                  </div>

                  <div className="w-full px-4">
                    <InputField
                      labelName={UserArgNames.referralCode}
                      inputName={UserArgs.referralCode}
                      placeholder={`Input ${UserArgNames.referralCode}`}
                      disabled
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CardProfileUpdate;

const validationSchema = Yup.object().shape({
  name: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
});
