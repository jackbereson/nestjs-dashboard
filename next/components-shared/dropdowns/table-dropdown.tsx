import React, { createRef, useEffect, useRef, useState } from "react";
import { createPopper } from "@popperjs/core";
import useComponentVisible from "../../hooks/use-component-visible";
import { classNames } from "../../lib/helpers/design";
import NextIcon, { FCIcons } from "../next-icon";

const TableDropdown = ({ actions }: { actions?: any[] }) => {
  const [display, setDisplay] = useState(false);

  const toggle = () => {
    setDisplay(!display);
  };

  const ref = useRef();
  return (
    <div className="relative text-right">
      <button
        className={classNames(
          "text-gray-500 py-1 px-3 pr-5 border-0",
          display
            ? "bg-primary-dark rounded-tr-full rounded-br-full"
            : "bg-none",
            "outline-none"
        )}
        onClick={toggle}
        ref={ref}
      >
        <NextIcon className="text-lg" name={FCIcons.FcTimeline} />
      </button>
      {display && (
        <ActionsDropdown
          display={display}
          toggle={toggle}
          parentRef={ref}
          actions={actions}
        />
      )}
    </div>
  );
};

export default TableDropdown;

const ActionsDropdown = ({
  display,
  toggle,
  parentRef,
  actions,
}: {
  display: boolean;
  toggle: () => void;
  parentRef: any;
  actions: any[];
}) => {
  const { ref, isComponentVisible } = useComponentVisible(true);

  useEffect(() => {
    !isComponentVisible && toggle();
  }, [isComponentVisible]);

  useEffect(() => {
    if (display) {
      createPopper(parentRef.current, ref.current, {
        placement: "left-start",
      });
    }
  }, [display]);
  return (
    <div
      ref={ref}
      className={classNames(
        display ? "absolute right-0" : "hidden",
        "bg-blue-50 text-base z-50 float-left py-2 list-none",
        "text-left border-2 border-primary-dark",
        "rounded-bl-xl rounded-tl-xl shadow min-w-48",
        "animate-zoom-in duration-75"
      )}
    >
      {actions.map(({ Act }, k) => (
        <Act key={k} />
      ))}
    </div>
  );
};
