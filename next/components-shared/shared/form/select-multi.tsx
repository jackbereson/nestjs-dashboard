import { useEffect, useRef, useState } from 'react';
import { HiInformationCircle } from 'react-icons/hi';
import { FormFieldProps } from './form-field.type';
import { Label } from './label';

type SelectMutilProps = FormFieldProps & {
  values?: any[];
  options?: any[];
  tooltip?: string;
  addOnEmpty?: boolean;
  searchDelay?: number;
  onValuesChanged?: (values: string[]) => void;
  validateValues?: (values: string[]) => string;
  onSearch?: (search: string) => Promise<any[]>;
  onAddNew?: (value: string) => Promise<any>;
};
function parseStringToSelectOption(values: any[]) {
  if (values.length > 0 && typeof values[0] == "string") {
    values = values.map((value) => ({ value, display: value }));
  }
  return values;
}
export function SelectMulti({
  name,
  label,
  values = [],
  placeholder,
  tooltip,
  options,
  searchDelay = 250,
  addOnEmpty = false,
  onValuesChanged,
  onSearch,
  onAddNew,
  ...props
}: SelectMutilProps) {
  values = parseStringToSelectOption(values);
  options = parseStringToSelectOption(options);
  let [SelectIndex, setSelectIndex] = useState<number>();
  let [valueState, setValue] = useState(values);
  let [Show, setShow] = useState(false);
  let [Options, setOptions] = useState(options);
  const inputRef = useRef<any>();
  const optionsRef = useRef<any>();
  let searchDelayTimeout: number;
  const selectItem = (item) => {
    if (!valueState.find((v) => v.value == item.value)) {
      valueState = [...valueState, item];
      setValue(valueState);
    }
    inputRef.current.value = "";
    setOptions(options);
    
  };
  const onKeyDown = (event) => {
    switch (event.code) {
      case "ArrowUp":
        if (SelectIndex == null) SelectIndex = Options.length - 1;
        else SelectIndex = SelectIndex == 0 ? 0 : SelectIndex - 1;
        event.preventDefault();
        setSelectIndex(SelectIndex);
        break;
      case "ArrowDown":
        if (SelectIndex == null) SelectIndex = 0;
        else SelectIndex = SelectIndex >= Options.length - 1 ? Options.length - 1 : SelectIndex + 1;
        event.preventDefault();
        setSelectIndex(SelectIndex);
        break;
      case "Enter":
        if (SelectIndex != null) {
          event.preventDefault();
          if (Options.length == 0) {
            addNewValue();
          } else {
            selectItem(Options[SelectIndex]);
          }
          
        }
        break;
    }
    if (Show && SelectIndex != null && optionsRef.current && optionsRef.current.children[SelectIndex]) {
      optionsRef.current.children[SelectIndex].scrollIntoView({ block: "nearest" });
      console.log(optionsRef.current.children[SelectIndex]);
    }
    if (event.keyCode === 8 && event.target.value.length == 0 && valueState.length > 0) {
      removeChip(valueState.length - 1);
    }
  };
  const removeChip = (index: number) => {
    valueState.splice(index, 1);
    setValue([...valueState]);
  };
  const replaceBold = (item) => {
    const regex = new RegExp(`(${inputRef.current.value})`, "gi");
    if (item) return item.replace(regex, `<b>$1</b>`);
  };
  const addNewValue = () => {
    if (addOnEmpty) {
      if (onAddNew) {
        onAddNew(inputRef.current.value).then(res => {
          selectItem(parseStringToSelectOption([res])[0])
        })
      } else {
        selectItem(parseStringToSelectOption([inputRef.current.value])[0])
      }
    }
  }
  useEffect(() => {
    if (Show) setSelectIndex(null);
  }, [Show]);
  useEffect(() => {
    if (onValuesChanged) onValuesChanged(valueState.map(v => v.value));
  }, [valueState]);
  useEffect(() => {
    setOptions(options);
  }, [options]);
  useEffect(() => {
    return () => {
      if (searchDelayTimeout) clearTimeout(searchDelayTimeout);
    }
  }, []);
  return (
    <>
      <div className="flex flex-col mb-3 relative">
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
        <div
          className={
            (valueState.length == 0 ? "p-2" : "p-1") +
            ` flex border border-gray-300 bg-white rounded-md svelte-1l8159u`
          }
        >
          <div className="flex flex-auto flex-wrap">
            {valueState.map((v, index) => (
              <div
                key={v + index}
                className="flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-full text-teal-700 bg-teal-100 border border-teal-300 "
              >
                <div className="text-xs font-normal leading-none max-w-full flex-initial">
                  {v.display}
                </div>
                <div className="flex flex-auto flex-row-reverse">
                  <div onClick={() => removeChip(index)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="100%"
                      height="100%"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-x cursor-pointer hover:text-teal-400 rounded-full w-4 h-4 ml-2"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex-1">
              <input
                ref={inputRef}
                type="text"
                className={
                  (valueState.length == 0 ? "p-2" : "p-3") +
                  " text-sm bg-transparent appearance-none outline-none h-full w-full text-gray-800"
                }
                placeholder={placeholder}
                onFocus={() => setShow(true)}
                onBlur={() => setTimeout(() => setShow(false), 50)}
                onKeyDown={onKeyDown}
                onChange={(e) => {
                  if (onSearch) {
                    if (searchDelayTimeout) clearTimeout(searchDelayTimeout);
                    setTimeout(() => {
                      onSearch(e.target.value).then((options) => {
                        setOptions(parseStringToSelectOption(options));
                      });
                    }, searchDelay);

                  } else {
                    const regex = new RegExp(e.target.value, "i");
                    setOptions(options.filter((o) => regex.test(o.display)));
                  }
                }}
              />
            </div>
          </div>
        </div>
        {Show && Options.length > 0 && <div className="absolute z-50 shadow bg-white w-full max-h-56 top-full mt-1 border border-gray-300 text-sm text-gray-400  border-t-0 overflow-auto rounded-md">
            <ul ref={optionsRef}>
              {(Options as any[]).map((item, index) => {
                return (
                  <li
                    key={index}
                    className={"p-4 hover:bg-gray-200 " + (SelectIndex == index && "bg-gray-200")}
                    onClick={() => selectItem(item)}
                  >
                    <span dangerouslySetInnerHTML={{ __html: replaceBold(item.display) }}></span>
                  </li>
                );
              })}
            </ul>
          </div>}
          {Show && Options.length == 0 && addOnEmpty && <div className="absolute z-50 shadow bg-white w-full max-h-56 top-full mt-1 border border-gray-300 text-sm text-gray-400  border-t-0 overflow-auto rounded-md">
            <ul ref={optionsRef}>
              <li
                className={"p-4 hover:bg-gray-200 " + (SelectIndex == 0 && "bg-gray-200")}
                onClick={() => addNewValue()}
              >
                <span>Thêm <b>{inputRef.current.value}</b> ...</span>
              </li>
            </ul>
          </div>}
      </div>
    </>
  );
}
