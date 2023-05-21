import { useEffect, useRef, MutableRefObject, CSSProperties } from "react";

export function Textarea({ className = "", style = {}, ...props }: {
  value: any;
  rows?: number;
  readonly?: boolean;
  placeholder?: string;
  name?: string;
  onChange?: (val: string) => any;

  className?: string;
  style?: CSSProperties;
  children?: any;
}) {
  const ref: MutableRefObject<HTMLTextAreaElement> = useRef();

  useEffect(() => {
    ref.current.style.height = "0px";
    ref.current.style.height = ref.current.scrollHeight + "px";
  }, [props.value]);
  return (
    <textarea
      ref={ref}
      rows={props.rows || 3}
      className={`form-input box-content py-2 ${className || ""}`.trim()}
      style={{ width: `calc(100% - 24px)`, ...style }}
      name={props.name}
      readOnly={props.readonly}
      value={props.value}
      placeholder={props.placeholder}
      onChange={(e) => props.onChange(e.target.value)}
    ></textarea>
  );
}
