import { Field, FieldArray } from "formik";
import { classNames } from "../../../lib/helpers/design";

const ChecklistField = ({
  labelName,
  inputName,
  checkboxesData,
  wrapperClass,
  lableClass,
  wrapperInputClass,
  Icon,
  haveErrors,
  error,
}: {
  inputName: string;
  wrapperClass?: string;
  lableClass?: string;
  wrapperInputClass?: string;
  Icon?: (props: React.ComponentProps<"svg">) => any;
  labelName?: string;
  placeholder?: string;
  haveErrors?: boolean;
  error?: string;
  checkboxesData?: any[];
}) => {
  return (
    <div className={classNames("mb-2", wrapperClass)}>
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
            haveErrors ? "border-danger" : "",
            wrapperInputClass
          )}
        >
          {Icon && (
            <div className="w-10 h-10 flex justify-center items-center flex-shrink-0">
              <Icon className="w-5 h-5 text-gray-500" />
            </div>
          )}
          <div className="grid grid-cols-4">
            <FieldArray
              name={inputName}
              render={(arrayHelpers) =>
                checkboxesData.map((opt, index) => (
                  <label key={index} className='cursor-pointer mr-2 flex'>
                    <Field
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-primary mr-2 border"
                      value={opt.value}
                      name={`${inputName}`}
                      // onClick={() => arrayHelpers.insert(index, opt.value)}
                    />
                    <div className='w-100'>{opt.name}</div>
                  </label>
                ))
              }
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

export default ChecklistField;
