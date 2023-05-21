import { useEffect, useState } from "react";
import { SettingKeys } from "../lib/helpers/setting.helper";
import { MenuCategory, MenuData } from "../lib/models/menu-data.model";
import { UserRole } from "../lib/modules/user/user.model";
import { adminMenu, categories, editorMenu } from "../shared/menu-data";
import useAuth from "./use-auth";
import useSettings from "./use-settings";

const useMenu = (): [MenuData[], MenuCategory[], boolean] => {
  const settings = useSettings();
  const [menu, setMenu] = useState<MenuData[]>(null);
  const [menuCategories, setMenuCategories] = useState<MenuCategory[]>(null);
  const [useCategory, setUseCategory] = useState(false);
  const auth = useAuth();

  useEffect(() => {
    if (auth && settings) {
      const useCategorySetting = settings.find((set) => set.key === SettingKeys.USE_MENU_CATEGORY);

      setMenuCategories(categories);

      if (useCategorySetting) {
        setUseCategory(useCategorySetting.value);
      }

      let menuData: MenuData[] = null;
      if (auth.role === UserRole.ADMIN) {
        menuData = adminMenu as MenuData[];
      }

      if (auth.role === UserRole.EDITOR) {
        menuData = editorMenu as MenuData[];
      }

      setMenu(menuData);
    }
  }, [auth, settings]);

  return [menu, menuCategories, useCategory];
};

export default useMenu;
