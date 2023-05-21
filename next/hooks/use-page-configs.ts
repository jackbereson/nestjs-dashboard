import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { PageConfigs, ViewModes } from "../lib/models/page.model";
import useMenu from "./use-menu";

const usePageConfigs = (): [ViewModes, Dispatch<SetStateAction<ViewModes>>] => {
    const [menu] = useMenu();
    const [viewMode, setViewMode] = useState<ViewModes>(ViewModes.LIST);
    const router = useRouter();

    useEffect(() => {
        if (menu) {
            const currentMenuItem = menu.find((item) => {
                const [, path] = router.pathname.split("/");
                const [, url] = item.url.split("/");
                return path === url;
            });
            const configs = localStorage.getItem(currentMenuItem?.code);
            if (configs) {
                const initViewMode = (JSON.parse(configs) as PageConfigs)?.viewMode;
                setViewMode(initViewMode);
            }
        }
    }, [menu, router.pathname]);

    return [viewMode, setViewMode];
}

export default usePageConfigs;