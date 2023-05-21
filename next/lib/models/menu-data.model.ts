import { User, UserRole } from "../modules/user/user.model";

export type MenuData = {
  code?: string;
  name?: string;
  title?: string;
  description?: string;
  header?: string;
  url?: string;
  image?: string;
  Icon?: any;
  frame?: string;
  keywords?: string;
  catergoryCode?: string;
  active?: boolean;
  icon?: string;
};

export type MenuCategory = {
  name?: string;
  code?: string;
};

export const getMenu = ({
  auth,
  adminMenusData,
  editorMenusData,
}: {
  auth: User;
  adminMenusData: MenuData[];
  editorMenusData: MenuData[];
}): MenuData[] => {
  let menu = null;
  if (auth.role === UserRole.ADMIN) {
    menu = adminMenusData;
  }
  if (auth.role === UserRole.EDITOR) {
    menu = editorMenusData;
  }
  return menu;
};
