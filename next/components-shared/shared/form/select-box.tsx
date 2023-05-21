import { useRef, useEffect, useState } from "react";
import { HiChevronDown, HiInformationCircle } from 'react-icons/hi';
import { FormFieldProps } from "./form-field.type";
import { Input } from "./input";
import { Label } from "./label";

export type SelectBoxOption = {
  value: string;
  display?: string;
  style?: string;
};
type SelectBoxProps = FormFieldProps & {
  options?: SelectBoxOption[] | string[];
  noneOption?: SelectBoxOption;
  onSearch?: (keyword: string) => Promise<SelectBoxOption[] | string[]>;
};
export function SelectBox({
  label,
  name,
  placeholder,
  required,
  value,
  style,
  options = [],
  noneOption,
  onChanged,
  ...props
}: SelectBoxProps) {
  const [ValueInput, setValueInput] = useState("");
  const [Show, setShow] = useState(false);
  const [SelectIndex, setSelectIndex] = useState(0);
  const [Options, setOptions] = useState(options);
  let selectIndex = SelectIndex;
  const wrapperRef = useRef(undefined);
  const handleClickOutside = (event) => {
    if (wrapperRef && wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setShow(false);
    }
  };
  const selectItem = (item) => {
    setValueInput(item);
    if (props.onChange != null) props.onChange(item);
    setShow(false);
  };
  const handleKeyDown = (event) => {
    switch (event.code) {
      case "ArrowUp":
        selectIndex = selectIndex == 0 ? options.length - 1 : selectIndex - 1;
        event.preventDefault();
        setSelectIndex(selectIndex);
        break;
      case "ArrowDown":
        selectIndex = selectIndex == options.length - 1 ? 0 : selectIndex + 1;
        event.preventDefault();
        setSelectIndex(selectIndex);
        break;
      case "Enter":
        selectItem(options[selectIndex]);
        event.preventDefault();
        break;
    }
  };
  useEffect(() => {
    if (Show) {
      selectIndex = (options as string[]).indexOf(ValueInput);
      setSelectIndex(selectIndex);
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [Show]);
  return (
    <>
      <div className="relative" ref={wrapperRef}>
        {label && (
          <div className="flex items-center">
            <Label text={label} htmlFor={name} />
            {props.tooltip && (
              <div className="group pt-1 ml-2 w-5 tooltip">
                <i className="text-gray-400">
                  <HiInformationCircle />
                </i>
                <div className="tooltiptext bg-gray-100 text-gray-400 p-1 w-44 max-w-xl text-center ml-3 text-xs">
                  {props.tooltip}
                </div>
              </div>
            )}
          </div>
        )}
        <div
          className={
            (Show ? " border-primary-500 " : "  border-gray-300 ") +
            style +
            " transition w-full rounded-lg border p-4 text-sm text-gray-400 relative flex items-center justify-between min-w-min"
          }
          onClick={() => setShow(!Show)}
        >
          {ValueInput != "" ? ValueInput : placeholder != null ? placeholder : options[0]}
          <div className={"w-3 h-3 transition ml-4 " + (Show && " transform rotate-180 ")}>
            <HiChevronDown />
          </div>
        </div>
        {Show ? (
          <div className="absolute z-50 shadow bg-white w-full max-h-56 top-full mt-1 border border-gray-300 text-sm text-gray-400  border-t-0 overflow-auto rounded-md">
            <ul>
              {(Options as any[]).map((item, index) => {
                return (
                  <li
                    key={index}
                    className={"p-4 hover:bg-gray-200 " + (SelectIndex == index && "bg-gray-200")}
                    onClick={() => selectItem(item)}
                  >
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
            ""
          )}
      </div>
    </>
  );
}
