import FacebookAuthButton from "./components/facebook-auth-button";
import GoogleAuthButton from "./components/google-auth-button";
import TwitterAuthButton from "./components/twitter-auth-button";

const OtherSignIn = () => {

  return (
    <>
      <GoogleAuthButton />
      <FacebookAuthButton />
      <TwitterAuthButton />      
    </>
  );
};

// SigninPage.Layout = DefaultLayout;
export default OtherSignIn;
