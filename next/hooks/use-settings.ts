import { useSelector } from "../redux/store";
import { Setting } from "../lib/modules/setting/setting.model";

const useSettings = (): Setting[] => {
    const [settingReducer] = useSelector(({ settingReducer }) => [
        settingReducer,
      ]);
    return settingReducer.settings;
};

export default useSettings;