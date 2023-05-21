import { FormFieldProps } from "./form-field.type";
import { Label } from "./label";
import format from "date-fns/format";
import { HiInformationCircle } from "react-icons/hi";
export function Input({
  label,
  name,
  required,
  placeholder,
  inputType = "text",
  icon = "",
  style,
  value,
  tooltip,
  ...props
}: FormFieldProps) {
  const onChange = (e) => {
    if (props.onChanged) props.onChanged(e.target.value);
  };
  const parseDefaultValue = (value) => {
    switch (inputType) {
      case "datetime-local":
        return format(new Date(value), "yyyy-MM-dd'T'HH:MM");
      default:
        return value;
    }
  };
  return (
    <div className="flex flex-col space-y-1">
      {label && (
        <div className="flex items-center">
          <Label text={label} htmlFor={name} />
          {tooltip && (
            <div className="group pt-1 ml-2 w-5 tooltip">
              <i className="text-gray-400">
                <HiInformationCircle />
              </i>
              <div className="tooltiptext bg-gray-100 text-gray-400 p-1 w-44 max-w-xl text-center ml-3 text-xs">
                {tooltip}
              </div>
            </div>
          )}
        </div>
      )}

      <input
        onChange={onChange}
        defaultValue={parseDefaultValue(value)}
        required={required}
        name={name}
        className={
          (icon ? " pl-10 " : "") +
          style +
          " w-full h-full bg-white ring-gray-300 ring-1 p-4 text-sm text-gray-500 rounded-md focus:outline-none focus:ring-primary-500"
        }
        type={inputType}
        placeholder={placeholder}
      />
    </div>
  );
}
