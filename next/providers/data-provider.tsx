import { createContext, useEffect } from "react";
import { useDispatch, useSelector } from "../redux/store";
import { ApiStatus } from "../redux/redux.helper";
import { setLoading } from "../redux/actions/loading.action";
import { userGetMe } from "../redux/actions/user.action";
import { useToast } from "./toast-provider";
import { getUserToken } from "../lib/modules/user/user.model";
import { getSettings } from "../redux/actions/setting.action";

const DataContext = createContext<{}>({});

const DataProvider = (props: any) => {
  const [userReducer, settingReducer] = useSelector(({ userReducer, settingReducer }) => [
    userReducer,
    settingReducer,
  ]);

  const dispatch = useDispatch();

  const toast = useToast();

  const loadUser = () => {
    const token = getUserToken(false);
    if (token) {
      userGetMe()(dispatch);
    }
  };

  const handleError = (error: Error) => {
    console.log("error", error);
    toast.error(error.message);
  };

  const loadSetting = () => {
    getSettings({ handleError })(dispatch);
  };

  useEffect(() => {
    loadUser();
    loadSetting();
  }, []);

  return <DataContext.Provider value="">{props.children}</DataContext.Provider>;
};

export default DataProvider;
