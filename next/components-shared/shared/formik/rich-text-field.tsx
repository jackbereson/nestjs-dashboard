import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { classNames } from "../../../lib/helpers/design";
import { EnvKeys } from "../../../lib/helpers/env.helper";
import useEnv from "../../../hooks/use-env";

const RichTextField = ({
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
}: {
  inputName?: string;
  value?: string;
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
  setFieldValue?: any;
}) => {
  const editorRef = useRef(null);
  const tinymceApiKey = useEnv(EnvKeys.tinymceApiKey);

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
            {/* <Field
              className="py-1 px-4 white tracking-wide w-full focus:bg-white disabled:cursor-not-allowed bg-white font-light"
              id={inputName}
              name={inputName}
              placeholder={placeholder}
              readOnly={readOnly}
              disabled={disabled}
              component="textarea"
              rows={rows}
              value={value}
            /> */}
            <Editor
              apiKey={tinymceApiKey}
              onInit={(evt, editor) => (editorRef.current = editor)}
              initialValue={value}
              init={{
                height: 500,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | " +
                  "bold italic backcolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat code | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
              onChange={(val) => {
                setFieldValue(inputName, val);
              }}
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

export default RichTextField;
