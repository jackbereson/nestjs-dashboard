import { CSSProperties, MutableRefObject, useRef } from "react";

export function Accordion(props: {
  open: boolean;
  className?: string;
  style?: CSSProperties;
  children?: any;
}) {
  const ref: MutableRefObject<HTMLDivElement> = useRef();

  return (
    <div
      className={`relative max-h-0 transition-all overflow-hidden delay-200 ${
        props.className || ""
      }`}
      ref={ref}
      style={{
        maxHeight:
          props.open && ref.current
            ? ref.current.scrollHeight + 500 + "px"
            : "",
      }}
    >
      {props.children}
    </div>
  );
}
