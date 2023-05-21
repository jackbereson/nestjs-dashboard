import { FormFieldProps } from "./form-field.type";
import { useEffect, useState } from "react";
import { HiInformationCircle } from "react-icons/hi";
type CheckBoxProps = FormFieldProps & {
  onChanged?: (value: boolean) => void;
  validate?: (value: boolean) => string;
  count?: string;
  checked?: boolean;
  tooltip?: string;
};
export function Checkbox({
  label,
  name,
  required,
  onChanged,
  checked,
  style,
  count,
  value = "true",
  tooltip = "",
}: CheckBoxProps) {
  const [Checked, setChecked] = useState(checked);
  useEffect(() => {
    setChecked(checked);
  }, [checked]);
  const onChange = (e) => {
    if (onChanged) onChanged(e.target.checked);
    setChecked(e.target.checked);
  };
  return (
    <div className={"flex items-center space-x-3 py-1"}>
      <input
        className="w-4 h-4 transition form-checkbox text-primary border-gray-300 border cursor-pointer"
        defaultValue={value}
        onChange={onChange}
        id={name}
        name={name}
        required={required}
        type="checkbox"
        checked={Checked}
      />
      <label className={style + " w-full " + (checked && " text-primary")} htmlFor={name}>
        <i className="bg-primary"></i>
        <div className="flex justify-between w-full">
          <p className={style + " capitalize " + (checked && " text-primary")}>{label}</p>
          {count && <p className="text-gray-400">({count})</p>}
        </div>
      </label>
      {tooltip !== "" ? (
        <div className="group pt-1 ml-2 w-5 tooltip">
          <i className="text-gray-400">
            <HiInformationCircle />
          </i>
          <div className="tooltiptext bg-gray-100 text-gray-400 p-2 w-44 max-w-xl text-center ml-3 text-xs">
            {label}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
