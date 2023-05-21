import { Field } from "formik";
import { classNames } from "../../../lib/helpers/design";

const TextAreaField = ({
  labelName,
  inputName,
  rows,
  value,
  placeholder,
  wrapperClass,
  lableClass,
  wrapperInputClass,
  important,
  Icon,
  haveErrors,
  error,
  disabled = false,
  readOnly = false,
  prefixText,
}: {
  inputName?: string;
  value?: string;
  rows?: string;
  prefixText?: string;
  wrapperClass?: string;
  lableClass?: string;
  wrapperInputClass?: string;
  mappingValue?: string;
  important?: boolean;
  Icon?: (props: React.ComponentProps<"svg">) => any;
  labelName?: string;
  placeholder?: string;
  haveErrors?: boolean;
  error?: string;
  selectData?: any[];
  checkboxesData?: any[];
  disabled?: boolean;
  readOnly?: boolean;
}) => {
  return (
    <div
      className={classNames("mb-2", disabled ? "opacity-50" : "", wrapperClass)}
    >
      {labelName && (
        <label
          htmlFor={inputName}
          className={classNames(
            "font-light text-sm px-1 capitalize flex items-center gap-1",
            haveErrors ? "text-danger" : "",
            lableClass
          )}
        >
          {labelName}
          {important && <div className="mr-2 text-danger">*</div>}
        </label>
      )}
      {
        <div
          className={classNames(
            "border border-solid rounded-lg flex items-center shadow-md",
            haveErrors ? "border-danger" : "",
            wrapperInputClass
          )}
        >
          {Icon && (
            <div className="w-10 h-10 flex justify-center items-center flex-shrink-0">
              <Icon className="w-5 h-5 text-gray-500" />
            </div>
          )}
          <div className="flex-1 flex items-center">
            <div className="font-light">{prefixText}</div>
            <Field
              className="py-1 px-4 white tracking-wide w-full focus:bg-white disabled:cursor-not-allowed bg-white font-light"
              id={inputName}
              name={inputName}
              placeholder={placeholder}
              readOnly={readOnly}
              disabled={disabled}
              component="textarea"
              rows={rows}
              value={value}
            />
          </div>
        </div>
      }

      {haveErrors && (
        <div className="text-danger text-xs p-1 pb-0">{error}</div>
      )}
    </div>
  );
};

export default TextAreaField;
