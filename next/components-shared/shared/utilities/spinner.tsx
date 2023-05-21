import { CSSProperties } from "react";
import { CgSpinner } from "react-icons/cg";

export function Spinner({
  icon = <CgSpinner />,
  className = "",
  ...props
}: {
  icon?: JSX.Element;
  className?: string;
  style?: CSSProperties;
  children?: any;
}) {
  return (
    <div className={`w-full flex-center py-32 px-2 text-primary ${className}`}>
      <i className="animate-spin text-4xl">{icon}</i>
    </div>
  );
}
