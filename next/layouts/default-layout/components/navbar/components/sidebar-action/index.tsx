import { ViewListIcon } from "@heroicons/react/solid";
import { actionType } from "../..";
import { classNames } from "../../../../../../lib/helpers/design";
import SiderbarMenu from "./sidebar-menu";

const SidebarAction = ({ display, setAction }: any) => {
  const toggle = () => {
    // console.log("display", display);
    if (display) {
      setAction("");
    } else {
      setAction(actionType.SIDEBAR);
    }
  };
  return (
    <>
      <div className="ml-3 relative">
        <div>
          <button
            className={classNames(
              "bg-primary-dark p-1 rounded-md",
              "text-white hover:text-white",
              "focus:outline-none focus:ring-2 focus:ring-offset-2",
              "focus:ring-offset-yellow-600 focus:ring-white"
            )}
            onClick={toggle}
          >
            <span className="sr-only">Open user menu</span>
            <ViewListIcon className="w-6" />
          </button>
        </div>
      </div>
      {display && <SiderbarMenu display={display} toggle={toggle} />}
    </>
  );
};

export default SidebarAction;
