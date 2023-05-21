import { useEffect, useState } from 'react';
import { HiInformationCircle } from "react-icons/hi";
import { FormFieldProps } from "./form-field.type";
import { Label } from "./label";
import { SearchBox } from "./search-box";

type SelectMutilProps = FormFieldProps & {
    values?: string[],
    onValuesChanged?: (values: string[]) => void
    validateValues?: (values: string[]) => string;
    tooltip?: string,
}
export function SearchBoxMulti({ name, label, values = [], placeholder, onValuesChanged, tooltip, ...props }: SelectMutilProps) {
    const [valueState, setValue] = useState(values);
    const onKeyDown = (e) => {
        console.log(e)
        if (e && e.length > 0) {
            if (!valueState.includes(e)) {
                setValue([...valueState, e]);
            }
            e = "";
        }
    }
    const removeChip = (index: number) => {
        valueState.splice(index, 1)
        setValue([...valueState]);
    }
    useEffect(() => {
        if (onValuesChanged) onValuesChanged(valueState);
    }, [valueState]);
    return <>
        <div className="flex flex-col mb-3">
            {label && <div className="flex items-center">
                <Label text={label} htmlFor={name} />
                {tooltip && <div className="group pt-1 ml-2 w-5 tooltip" >
                    <i className='text-gray-400'><HiInformationCircle/></i>
                    <div className="tooltiptext bg-gray-100 text-gray-400 p-1 w-44 max-w-xl text-center ml-3 text-xs">
                        {tooltip}
                    </div>
                </div>}
            </div>}
            <div className={`p-${valueState.length == 0 ? "2" : "1"} flex border border-gray-300 bg-white rounded-md svelte-1l8159u`}>
                <div className="flex flex-auto flex-wrap">
                    {valueState.map((v, index) => (
                        <div key={v + index} className="flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-full text-teal-700 bg-teal-100 border border-teal-300 ">
                            <div className="text-xs font-normal leading-none max-w-full flex-initial">{v}</div>
                            <div className="flex flex-auto flex-row-reverse">
                                <div onClick={() => removeChip(index)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x cursor-pointer hover:text-teal-400 rounded-full w-4 h-4 ml-2">
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="flex-1">
                        <SearchBox
                            style='border-none' />
                    </div>
                </div>
            </div>
        </div>
    </>
}