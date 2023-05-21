import { classNames } from "../../../lib/helpers/design";
import ReactTagInput from "next-js-suggest-input";
import "next-js-suggest-input/build/react-tag-input.css";
import { useState } from "react";

const ArrayField = ({
  labelName,
  inputName,
  placeholder,
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
}: {
  inputName?: string;
  prefixText?: string;
  wrapperClass?: string;
  placeholder?: string;
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
        <div className="flex-1 flex items-center w-96 h-56 overflow-auto py-2">
          <div className="font-light">{prefixText}</div>
          <ReactTagInput
            tags={Array.isArray(value) && value || []}
            placeholder={placeholder}
            maxTags={100}
            editable={false}
            readOnly={false}
            removeOnBackspace={true}
            suggestions={Array.isArray(value) && value || []}
            onChange={(val) => {
              setFieldValue(inputName, val);
            }}
          />
        </div>
      </div>

      {haveErrors && (
        <div className="text-danger text-xs p-1 pb-0">{error}</div>
      )}
    </div>
  );
};

export default ArrayField;
