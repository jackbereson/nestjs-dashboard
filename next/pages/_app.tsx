import "../styles/style.scss";
import { DefaultSeo } from "next-seo";
import { Provider } from "react-redux";
import store from "../redux/store";
import LoadingProvider from "../providers/loading-provider";
import ToastProvider, { useToast } from "../providers/toast-provider";
import DataProvider from "../providers/data-provider";
import usePage from "../hooks/use-page";
import { AlertProvider } from "../providers/alert-provider";
import React from "react";
import Web3Provider from "../providers/web3-provider";

const App = ({ Component, pageProps }) => {
  const Layout = Component.Layout ? Component.Layout : React.Fragment;
  const layoutProps = Component.LayoutProps ? Component.LayoutProps : {};

  const pageData = usePage();

  const defaultSeoProps = {
    titleTemplate: "%s | DC8 - NFT Marketplace",
    title: pageData?.title,
    description: pageData?.description,
    openGraph: {
      type: "website",
      locale: "vi_VN",
      url: "https://dc8-dashboard.web5dev.tech",
      site_name: pageData?.title,
    },
  };

  return (
    <>
      <DefaultSeo {...defaultSeoProps} />
      <Provider store={store}>
        <LoadingProvider>
          <ToastProvider>
            <Web3Provider>
              <AlertProvider>
                <DataProvider>
                  <Layout {...layoutProps}>
                    <Component {...pageProps} pageData={pageData} />
                  </Layout>
                </DataProvider>
              </AlertProvider>
            </Web3Provider>
          </ToastProvider>
        </LoadingProvider>
      </Provider>
    </>
  );
};

App.getInitialProps = async ({ Component, ctx }) => {
  const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
  return { pageProps };
};

export default App;
