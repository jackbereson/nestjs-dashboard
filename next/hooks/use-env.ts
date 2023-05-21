import { EnvKeys } from '../lib/helpers/env.helper';
import getConfig from "next/config";

const useEnv = (key: EnvKeys) => {
    const { publicRuntimeConfig } = getConfig();
    return publicRuntimeConfig[key];
}

export default useEnv;