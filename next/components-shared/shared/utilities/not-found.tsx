import { CSSProperties } from "react";

export function NotFound(props: {
  icon?: JSX.Element;
  text: string;
  className?: string;
  style?: CSSProperties;
  children?: any;
}) {
  return (
    <div
      className={`w-full flex-center flex-col text-center text-gray-500 py-12 text-lg font-semibold ${
        props.className || ""
      }`}
    >
      {props.icon && <i className="text-3xl mb-2">{props.icon}</i>}
      <span>{props.text || "Không tìm thấy"}</span>
    </div>
  );
}
