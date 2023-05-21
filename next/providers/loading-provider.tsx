import { createContext } from "react";
import PageLoading from "../components-shared/page-loading";
import { useSelector } from "../redux/store";

const LoadingContext = createContext<{}>({});

const LoadingProvider = (props: any) => {
  const [loadingReducer] = useSelector(({ loadingReducer }) => [
    loadingReducer,
  ]);

  // console.log("loadingReducer.loadingStatus", loadingReducer.loadingStatus);

  return (
    <LoadingContext.Provider value="">
      <PageLoading isLoading={loadingReducer.loadingStatus} />
      {props.children}
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;
