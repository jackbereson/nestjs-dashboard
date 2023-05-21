import { Field, FieldArray } from "formik";
import { classNames } from "../../../lib/helpers/design";

const SelectField = ({
  labelName,
  inputName,
  selectData,
  wrapperClass,
  lableClass,
  wrapperInputClass,
  Icon,
  haveErrors,
  error,
  disabled,
  loadData,
  CreateModalAction,
}: {
  lableClass?: string;
  inputName: string;
  wrapperClass?: string;
  wrapperInputClass?: string;
  Icon?: (props: React.ComponentProps<"svg">) => any;
  labelName?: string;
  placeholder?: string;
  haveErrors?: boolean;
  error?: string;
  selectData?: any[];
  disabled?: boolean;
  loadData?: any;
  CreateModalAction?: any;
}) => {
  return (
    <div className={classNames("mb-2", disabled ? "opacity-50" : "", wrapperClass)}>
      {labelName && (
        <label
          htmlFor={inputName}
          className={classNames(
            "font-light text-sm px-1 capitalize flex items-center",
            haveErrors ? "text-danger" : "",
            lableClass
          )}
        >
          {labelName}
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
          <Field
            as="select"
            name={inputName}
            className="h-10 py-1 px-3 w-full focus:bg-white disabled:cursor-not-allowed bg-white font-light"
            disabled={disabled}
          >
            {selectData?.map((opt, k) => (
              <option value={opt.value} key={k}>
                {opt.name}
              </option>
            ))}
          </Field>
          {CreateModalAction && <CreateModalAction loadData={loadData} />}
        </div>
      }

      {haveErrors && <div className="text-red-600 text-xs p-1 pb-0">{error}</div>}
    </div>
  );
};

export default SelectField;
