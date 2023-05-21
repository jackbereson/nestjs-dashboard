import { CSSProperties } from "react";
import { HiChevronDown } from "react-icons/hi";

export enum SelectValueType {
  string = "string",
  number = "number",
}

export function Select({
  className = "",
  wrapperClassName = "",
  valueType = SelectValueType.string,
  ...props
}:  {
  value: any;
  options: any[];
  onChange: Function;
  disabled?: boolean;
  wrapperClassName?: string;
  valueType?: string;

  className?: string;
  style?: CSSProperties;
  children?: any;
}) {

  const changeSelect = (e)=>{
    const value = valueType === SelectValueType.number ? parseInt(e.target.value) : e.target.value.toString();
    props.onChange(value)
  }

  return (
    <div className={`relative flex items-center group ${wrapperClassName}`}>
      <select
        disabled={props.disabled ? props.disabled : false}
        className={`form-input appearance-none pr-8 ${className || ""}`}
        value={
          valueType === SelectValueType.number
            ? props.value
            : props.value.toString()
        }
        onChange={changeSelect}
      >
        {props.options.map((option, index) => (
          <option
            key={index}
            value={option.value}
            className={`${className || ""}`}
          >
            {option.label}
          </option>
        ))}
      </select>
      <i
        className={`text-gray-500 text-xl absolute right-0 p-2 pointer-events-none ${
          props.disabled
            ? "group-hover:text-gray-600"
            : "group-hover:text-primary"
        }`}
      >
        <HiChevronDown />
      </i>
    </div>
  );
}
