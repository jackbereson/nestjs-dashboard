import React from "react";
import AdminLayout from "../layouts/admin-layout/admin.layout";
import useAuth from "../hooks/use-auth";
import { UserServiceStatus } from "../lib/modules/user/user.model";
import Dashboard from "../components/dashboard/dashboard";

const DashboardPage = () => {
  const auth = useAuth();
  // console.log("auth", auth);
  return auth && <Dashboard />;
};

DashboardPage.Layout = AdminLayout;
export default DashboardPage;
