import { useState } from "react"
type InputRangeProps = {
    onChange?: (e: any) => void;
    max?: string;
    min: string;
    step: string;
}
export function InputRange({ onChange, max = '2000000', min = '1000', step = '5000', ...props }: InputRangeProps) {
    const [point, setpoint] = useState('1500')
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'VND',

        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });

    return <div className="flex flex-col">
        <input type="range" id="points" name="points" min={min} max={max} step={step} value={point}
            onChange={(e) => {
                setpoint(e.target.value);
            }}
            className='w-full h-8' />
        <label htmlFor="points">
            <p className="text-lg">Giá từ</p>
            <p className="text-lg">{formatter.format(parseInt(min))} - {formatter.format(parseInt(point))}</p>
        </label>
    </div>
}