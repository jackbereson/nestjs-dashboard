import { CSSProperties } from "react";

export function Switch({
    ...props
  }: {
    value: any
    name?: string
    readonly?: boolean
    onChange?: (val: boolean) => any
  
    className?: string;
    style?: CSSProperties;
    children?: any;
  }) {
  return <span className="switch" onClick={e => props.onChange(!props.value)}>
    <input
      type="checkbox"
      value={props.value}
      checked={props.value}
      name={props.name}
      readOnly={props.readonly}
      onChange={() => {}}
    />
    <span className="slider round"></span>
  </span>
}