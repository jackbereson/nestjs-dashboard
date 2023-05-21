import { UserIcon } from "@heroicons/react/outline";
import { actionType } from "../..";
import UserMenu from "./user-menu";
import numeral from "numeral";
import useAuth from "../../../../../../hooks/use-auth";

const UserAction = ({ display, setAction }: any) => {
  const auth = useAuth();

  const toggle = () => {
    if (display) {
      setAction("");
    } else {
      setAction(actionType.USER);
    }
  };

  return (
    <>
      <div className="ml-4 mr-1 text-primary-dark">
        <div className="text-xs leading-4">Balance</div>
        <div className="">
          {auth && (
            <div className="flex">
              <div className="font-semibold text-md leading-4">
                {numeral(auth.balance).format("0,0")}
              </div>
              <div className="font-light text-xs visible leading-4 ml-1">
                CAD
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="ml-3 relative">
        {auth && <div>
          <button
            className={`max-w-xs bg-primary rounded-full flex items-center text-sm 
          ${"focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-yellow-600 focus:ring-white"}`}
            id="user-menu"
            aria-haspopup="true"
            onClick={toggle}
          >
            <span className="sr-only">Open user menu</span>
            {auth?.avatar ? (
              <img
                className="h-10 w-10 rounded-full shadow-md"
                src={auth?.avatar}
                alt=""
              />
            ) : (
              <div className="h-10 w-10 rounded-full shadow-md p-2">
                <UserIcon className="text-white" />
              </div>
            )}
          </button>
        </div>}
        {display && <UserMenu display={display} toggle={toggle} />}
      </div>
    </>
  );
};

export default UserAction;
