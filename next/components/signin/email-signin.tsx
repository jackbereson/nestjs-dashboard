import { Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useDispatch } from "../../redux/store";
import { setLoading } from "../../redux/actions/loading.action";
import InputField, { InputType } from "../../components-shared/shared/formik/input-field";
import { Button } from "../../components-shared/shared/utilities/form/button";
import { signinUserByEmail } from "../../redux/actions/user.action";
import { useToast } from "../../providers/toast-provider";

const EmailSignIn = () => {
  const dispatch = useDispatch();
  const toast = useToast();

  const submit = (values: FormikType, { setSubmitting }: FormikHelpers<FormikType>) => {
    signin(values);
    setSubmitting(false);
  };

  const handleError = (error: Error) => {
    setLoading(false)(dispatch);
    toast.error(error.message);
  };

  const signin = async (values: FormikType) => {
    setLoading(true)(dispatch);
    signinUserByEmail(values.email, values.password, handleError)(dispatch);
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submit}>
      {({ errors, touched, values }) => (
        <Form>
          <div className="p-3">
            <InputField
              labelName="email"
              inputName="email"
              inputType={InputType.email}
              placeholder="Input your email"
              haveErrors={errors.email && touched.email}
              error={errors.email}
            />
            <InputField
              labelName="Password"
              inputName="password"
              inputType={InputType.password}
              placeholder="Input your password"
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
export default EmailSignIn;

type FormikType = {
  email: string;
  password: string;
};

const initialValues: FormikType = {
  email: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Sorry, your email address is invalid")
    .max(70, "Sorry, your username must be between 15 and 70 characters long")
    .required("Enter your email address"),
  password: Yup.string()
    .min(6, "Sorry, your password must be between 6 and 30 characters long")
    .max(30, "Sorry, your password must be between 6 and 30 characters long")
    .required("Enter your password"),
});
