// import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { EnvKeys } from "../lib/helpers/env.helper";
import useEnv from "../hooks/use-env";

const ReCaptchaProvider = ({ chilren }: any) => {
  const recaptcha = useEnv(EnvKeys.recaptcha);
  // <GoogleReCaptchaProvider reCaptchaKey={recaptcha}>
  // </GoogleReCaptchaProvider>
  return <div>{chilren}</div>;
};

export default ReCaptchaProvider;
