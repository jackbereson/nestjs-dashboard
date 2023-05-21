import React from "react";
import AdminLayout from "../layouts/admin-layout/admin.layout";
import DecoHeader from "../components-shared/deco-header";
import useAuth from "../hooks/use-auth";
import CardProfile from "../components/profile/card-profile";
import CardProfileUpdate from "../components/profile/card-profile-update";

// components

// layout for page
export default function Profile() {
  const auth = useAuth();

  return (
    <>
      <DecoHeader />
      <div className="px-4 md:px-2 mx-auto w-full -mt-24">
        <div className="flex flex-wrap">
          <div className="w-full lg:w-4/12 px-4">{auth && <CardProfile user={auth} />}</div>
          <div className="w-full lg:w-8/12 px-4">{auth && <CardProfileUpdate user={auth} />}</div>
        </div>
      </div>
    </>
  );
}

Profile.Layout = AdminLayout;
