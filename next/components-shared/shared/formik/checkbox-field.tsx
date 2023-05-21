import { Field } from "formik";
import { classNames } from "../../../lib/helpers/design";

const CheckboxField = ({
  labelName,
  inputName,
  wrapperClass,
  lableClass,
  haveErrors,
  error,
  disabled,
  frontPosition
}: {
  inputName: string;
  wrapperClass?: string;
  lableClass?: string;
  labelName?: string;
  placeholder?: string;
  haveErrors?: boolean;
  error?: string;
  selectData?: any[];
  checkboxesData?: any[];
  disabled?: boolean;
  frontPosition?: boolean;
}) => {
  return (
    <div
      className={classNames("mb-2", disabled ? "opacity-50" : "", wrapperClass)}
    >
      <label
        className={classNames(
          "font-light text-sm px-1 capitalize flex items-center cursor-pointer gap-3",
          haveErrors ? "text-danger" : "",
          lableClass
        )}
      >
        {frontPosition && <span className=''>{labelName}</span>}
        <Field
          type="checkbox"
          name={inputName}
          className={classNames(
            "form-checkbox h-5 w-5 text-primary mr-2 border"
          )}
          disabled={disabled}
        />
        {!frontPosition && <span>{labelName}</span>}
      </label>
      {haveErrors && (
        <div className="text-danger text-xs p-1 pb-0">{error}</div>
      )}
    </div>
  );
};

export default CheckboxField;
