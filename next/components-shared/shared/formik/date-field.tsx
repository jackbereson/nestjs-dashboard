import moment from "moment-timezone";
import { DatePicker } from "antd";
import { classNames } from "../../../lib/helpers/design";
import { TIMEZONE_CODE } from "../../../lib/helpers/common.helper";

const DateField = ({
  labelName,
  inputName,
  value,
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
  setFieldValue,
  format,
  placeholder,
}: {
  inputName?: string;
  prefixText?: string;
  wrapperClass?: string;
  lableClass?: string;
  wrapperInputClass?: string;
  value?: any;
  important?: boolean;
  Icon?: (props: React.ComponentProps<"svg">) => any;
  labelName?: string;
  haveErrors?: boolean;
  error?: string;
  selectData?: any[];
  checkboxesData?: any[];
  disabled?: boolean;
  readOnly?: boolean;
  setFieldValue?: any;
  format?: any;
  placeholder?: any;
}) => {
  return (
    <div className={classNames("mb-5", disabled ? "opacity-50" : "", wrapperClass)}>
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
      <div
        className={classNames(
          "border border-solid rounded-lg flex items-center h-10",
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
          <DatePicker
            className="w-full h-10 rounded-lg"
            disabled={disabled}
            defaultValue={moment(value).tz(TIMEZONE_CODE)}
            onChange={(val: any) => setFieldValue(inputName, new Date(val))}
            inputReadOnly={readOnly}
            // onBlur={onBlur}
            format={format}
            placeholder={placeholder}
          />
        </div>
      </div>

      {haveErrors && <div className="text-danger text-xs p-1 pb-0">{error}</div>}
    </div>
  );
};

export default DateField;
