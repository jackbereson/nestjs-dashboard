import { createRef, useRef, useState } from "react";
import { FormFieldProps } from "./form-field.type";

export function InputVerify({ label, name, required, placeholder, inputType = "text", icon = '', style, value, tooltip, ...props }: FormFieldProps) {
    const onChange = (e) => {
        if (!isNaN(e.target.value)) {
            if (input[e.target.name].length < 1 || e.target.value.length < 2) {
                input[parseInt(e.target.name)] = e.target.value;
            }
            if (input[parseInt(e.target.name)] != '') {
                status[parseInt(e.target.name)] = true;
            } else {
                status[parseInt(e.target.name)] = false;
            }
            setinput([...input])
            setstatus([...status])
            if (parseInt(e.target.name) < 5) (refs.current[parseInt(e.target.name) + 1].current as any).focus();
            if (props.onChanged) props.onChanged(input.join(''));
        }

    }
    const hadleFocus = (event) => event.target.select();
    const [input, setinput] = useState(['', '', '', '', '', '']);
    const [status, setstatus] = useState([false, false, false, false, false, false])
    const refs = useRef([createRef(), createRef(), createRef(), createRef(), createRef(), createRef()])
    return <div className="flex space-x-3 py-5">
        {
            input.map((item, index) => {
                return <>
                    <input
                        onChange={onChange} key={index}
                        onFocus={hadleFocus}
                        name={`${index}`}
                        className={" w-full h-full  bg-white p-1 text-6xl text-center text-primary-500 focus:outline-none border-b " + (status[index] && "border-secondary-500")}
                        type={inputType}
                        value={input[index]}
                        ref={refs.current[index] as any} />
                </>
            })
        }

    </div>;
}