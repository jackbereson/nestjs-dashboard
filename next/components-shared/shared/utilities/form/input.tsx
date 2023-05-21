import { CSSProperties } from "react";

export function Input({
  type = "text",
  className = "",
  wrapperClassName = "",
  prefixClassName = "",
  ...props
}: {
  value: any;
  placeholder?: string;
  name?: string;
  readonly?: boolean;
  type?: "text" | "tel" | "email" | "number" | "password";
  wrapperClassName?: string;
  prefix?: string;
  prefixClassName?: string;
  onChange?: (val: string) => any;
  
  className?: string;
  style?: CSSProperties;
  children?: any;
}) {
  return (
    <div className={`relative flex items-center group  ${wrapperClassName}`}>
      {!!props.prefix && (
        <div
          className={`flex-shrink-0 flex items-center px-3 min-w-10 h-10 bg-gray-100 border border-gray-400 border-r-0 ${prefixClassName}`}
        >
          {props.prefix}
        </div>
      )}
      <input
        className={`form-input flex-grow ${className || ""}`}
        name={props.name}
        value={props.value}
        type={type}
        readOnly={props.readonly}
        placeholder={props.placeholder}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </div>
  );
}
