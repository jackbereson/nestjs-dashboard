import { HeadSEO } from "./components/head-seo";
import Footer from "./components/footer";
import Navbar from "./components/navbar";

const DefaultLayout = ({
  title = "DC8 - NFT Marketplace",
  ...props
}: {
  title?: string;
  children?: any;
}) => {
  // const styles = {
  //   background: "linear-gradient(243deg, #0c5e91 0%, #1da3f6 100%)",
  // };

  return (
    <>
      <HeadSEO />
      <div className="h-auto bg-primary-dark">
        <Navbar />
        <main>{props.children}</main>
        <Footer />
      </div>
    </>
  );
};
export default DefaultLayout;
