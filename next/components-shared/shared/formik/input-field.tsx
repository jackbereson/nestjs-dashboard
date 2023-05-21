import { Field } from "formik";
import { classNames } from "../../../lib/helpers/design";

export enum InputType {
  text = "text",
  number = "number",
  email = "email",
  password = "password",
}

const InputField = ({
  labelName,
  inputName,
  inputType = InputType.text,
  mappingValue,
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
  prefixText?: string;
  inputType?: InputType;
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
    <div className={classNames("mb-2", disabled ? "opacity-50" : "", wrapperClass)}>
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
            [InputType.text, InputType.email, InputType.number, InputType.password].includes(
              inputType
            )
              ? "border border-solid rounded-lgflex items-center shadow-md"
              : "",
            haveErrors ? "border-danger" : "",
            "overflow-hidden ",
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
            {[InputType.text, InputType.email, InputType.number, InputType.password].includes(
              inputType
            ) && (
              <>
                {mappingValue ? (
                  <Field
                    className="h-10 py-1 px-3 w-full focus:bg-white disabled:cursor-not-allowed bg-white text-black font-light"
                    id={inputName}
                    name={inputName}
                    placeholder={placeholder}
                    type={inputType}
                    disabled={disabled}
                    readOnly={readOnly}
                    value={mappingValue}
                    autoComplete="off"
                  />
                ) : (
                  <Field
                    className="h-10 py-1 px-3 w-full focus:bg-white disabled:cursor-not-allowed bg-white text-black font-light"
                    id={inputName}
                    name={inputName}
                    placeholder={placeholder}
                    type={inputType}
                    readOnly={readOnly}
                    disabled={disabled}
                    autoComplete="off"
                  />
                )}
              </>
            )}
          </div>
        </div>
      }

      {haveErrors && <div className="text-danger text-xs p-1 pb-0">{error}</div>}
    </div>
  );
};

export default InputField;
