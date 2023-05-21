import { AdminHeadSEO } from "./components/admin-head-seo";
import FooterAdmin from "./components/admin-footers/footer-admin";
import { useDispatch, useSelector } from "../../redux/store";
import { useEffect } from "react";
import { ApiStatus } from "../../redux/redux.helper";
import { logoutUser } from "../../redux/actions/user.action";
import { classNames } from "../../lib/helpers/design";
import { getUserToken } from "../../lib/modules/user/user.model";
import AdminHeaderBar from "./components/admin-header-bar";
import AdminSidebar from "./components/admin-sidebar";

const AdminLayout = ({
  title = "Dashboard",
  ...props
}: {
  title?: string;
  children?: any;
}) => {
  // console.log("AdminLayout");

  const [userReducer] = useSelector(({ userReducer }) => [userReducer]);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getUserToken(false);

    if (!token) {
      window.location.assign("/signin");
    }

    if (userReducer.status === ApiStatus.LOADED) {
      if (!userReducer.user) {
        logoutUser()(dispatch);
        window.location.assign("/signin");
      }
    }
  }, [userReducer.status]);

  return (
    <>
      <AdminHeadSEO />
      <AdminHeaderBar />
      <AdminSidebar />
      <main
        className={classNames(
          "relative md:ml-64 min-h-4xl md:pt-8",
          "bg-seconds",
          "dark:bg-black",
        )}
      >
        {props.children}
        <FooterAdmin />
      </main>
    </>
  );
};

export default AdminLayout;
