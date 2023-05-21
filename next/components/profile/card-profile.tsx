import NextIcon, { FCIcons } from "../../components-shared/next-icon";
import { User } from "../../lib/modules/user/user.model";

const CardProfile = ({ user }: { user: User }) => {
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg">
        <div className="px-6">
          <div className="flex flex-wrap ">
            <div className="w-full px-4 flex justify-center my-5">
              <div
                className="w-56 h-56 bg-primary flex justify-center items-center rounded-full shadow-lg border-4 border-gray-100"
                style={{
                  background: `url('${user.avatar || avatar}')`,
                  backgroundSize: "contain",
                }}
              />
            </div>
            <div className="w-full px-4 text-center">
              <div className="flex justify-center py-4 lg:pt-4 pt-8">
                <div className="mr-4 p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-gray-600">
                    22
                  </span>
                  <span className="text-sm text-gray-400">Customers</span>
                </div>
                <div className="mr-4 p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-gray-600">
                    10.000
                  </span>
                  <span className="text-sm text-gray-400">Balance</span>
                </div>
                <div className="lg:mr-4 p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-gray-600">
                    890
                  </span>
                  <span className="text-sm text-gray-400">Income</span>
                </div>
              </div>
            </div>
          </div>
          <div className=" mt-12">
            <h3 className="text-xl font-semibold leading-normal text-gray-700 mb-2">
              {user.name || "No name"}
            </h3>
            <div className="text-sm leading-normal mt-0 mb-2 text-gray-400 font-bold uppercase flex gap-1 items-center">
            <NextIcon  name={FCIcons.FcHighPriority} className="" />{" "}
              {user.email || user.phone}
            </div>
            <div className="text-sm leading-normal mt-0 mb-2 text-gray-400 font-bold uppercase flex gap-1 items-center">
            <NextIcon  name={FCIcons.FcHighPriority} className="" />{" "}
              {user.phone || "No info"}
            </div>
            <div className="mb-2 text-gray-600 mt-10 flex gap-1 items-center">
              <NextIcon  name={FCIcons.FcHighPriority} className="" />
              Agency name : {user.agencyName || "No info"}
            </div>
            <div className="mb-2 text-gray-600 flex gap-1 items-center">
              <NextIcon  name={FCIcons.FcHighPriority} className="" />
              Link :{" "}
              <a href={`https://demo.dc8.net/${user.referralCode}`}>
                dc8.net/{user.referralCode}
              </a>
            </div>
            <div className="mb-2 text-gray-600 flex gap-1 items-center">
            <NextIcon  name={FCIcons.FcHighPriority} className="" />
              Balance : {user.balance}
            </div>
            <div className="mb-2 text-gray-600 flex gap-1 items-center">
            <NextIcon  name={FCIcons.FcHighPriority} className="" />
              Point : {user.point}
            </div>

            <div className="mb-2 text-gray-600 mt-10 flex gap-1 items-center">
            <NextIcon  name={FCIcons.FcHighPriority} className="" />
              Agency name : {user.agencyName || "No info"}
            </div>
            <div className="mb-2 text-gray-600 flex gap-1 items-center">
            <NextIcon  name={FCIcons.FcHighPriority} className="" />
              Balance : {user.balance}
            </div>
            <div className="mb-10 text-gray-600 flex gap-1 items-center">
            <NextIcon  name={FCIcons.FcHighPriority} className="" />
              Point : {user.point}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardProfile;

const avatar =
  "data:image/jpeg;base64,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";
