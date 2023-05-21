import { Form, Formik, FormikHelpers } from "formik";
import { useDispatch } from "../../redux/store";
import { setLoading } from "../../redux/actions/loading.action";
import * as Yup from "yup";
import { countries } from "../../shared/countries";
import { signinUserByPhone } from "../../redux/actions/user.action";
import SelectField from "../../components-shared/shared/formik/select-field";
import InputField, {
  InputType,
} from "../../components-shared/shared/formik/input-field";
import { Button } from "../../components-shared/shared/utilities/form/button";

const PhoneSignIn = () => {
  const dispatch = useDispatch();

  const submit = (
    values: FormikType,
    { setSubmitting }: FormikHelpers<FormikType>
  ) => {
    signup(values);
    setSubmitting(false);
  };

  const signup = async (values: FormikType) => {
    setLoading(true)(dispatch);
    const phonecode = countries.find(
      (country) => country.country === values.country
    ).postcode;
    signinUserByPhone(`${phonecode}${values.phone}`, values.password)(dispatch);
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={submit}
    >
      {({ errors, touched, values }) => (
        <Form>
          <div className="p-3">
            <SelectField
              labelName="country"
              inputName="country"
              selectData={selectData}
            />
            <InputField
              prefixText={
                countries.find((country) => country.country === values.country)
                  .postcode
              }
              labelName={`Phone - (${
                countries.find((country) => country.country === values.country)
                  .postcode
              } 987654321)`}
              important
              inputName="phone"
              inputType={InputType.number}
              placeholder="Input your phone"
              haveErrors={errors.phone && touched.phone}
              error={errors.phone}
            />
            <InputField
              labelName="Password"
              important
              inputName="password"
              placeholder="Input password"
              inputType={InputType.password}
              haveErrors={errors.password && touched.password}
              error={errors.password}
            />
          </div>
          <div className="text-center">
            <Button primary submit className="btn-large px-8">
              Sign in
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

// SigninPage.Layout = DefaultLayout;
export default PhoneSignIn;

const selectData = countries.map((country) => {
  return {
    value: country.country,
    name: country.country,
  };
});

type FormikType = {
  country: string;
  phone: string;
  password: string;
};

const initialValues: FormikType = {
  country: "Canada",
  phone: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  phone: Yup.string()
    .min(5, "Sorry, your phone must be between 5 and 20 characters long")
    .max(20, "Sorry, your phone must be between 5 and 20 characters long")
    .required("Enter your phone address"),
  password: Yup.string()
    .min(6, "Sorry, your password must be between 6 and 30 characters long")
    .max(30, "Sorry, your password must be between 6 and 30 characters long")
    .required("Enter your password"),
});
