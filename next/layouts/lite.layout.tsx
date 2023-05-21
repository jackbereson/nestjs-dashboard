import { HeadSEO } from "./default-layout/components/head-seo";
import Footer from "./default-layout/components/footer";
// import PageLogo from "../components/page-logo";
import usePage from "../hooks/use-page";
import { PageData } from "../lib/models/page-data.model";
import Navbar from "./default-layout/components/navbar";

const LiteLayout = ({
  title = "DC8 - NFT Marketplace",
  ...props
}: {
  title?: string;
  children?: any;
}) => {
  const pageData = usePage();

  return (
    <>
      <HeadSEO />
      <Navbar />
      <Header pageData={pageData} />

      <main>
        {props.children}
        <Footer />
      </main>
    </>
  );
};
export default LiteLayout;

const Header = ({ pageData }: { pageData: PageData }) => {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto p-4 sm:px-6 lg:px-8 flex items-center gap-3">
        <div className="bg-yellow-600 w-100 h-100 p-2 rounded-full">
          {/* <PageLogo className="w-5 text-white" code={pageData.code} /> */}
        </div>
        <h1 className="text-xl uppercase font-light leading-none text-gray-900">
          {pageData.title}
        </h1>
      </div>
    </header>
  );
};
