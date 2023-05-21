export type FormFieldProps = {
  [x: string]: any;
  name?: string;
  value?: string;
  label?: string;
  id?: string;
  icon?: string;
  style?: string;
  placeholder?: string;
  onChanged?: (value: string) => void;
  validate?: (value: string) => string;
  required?: boolean;
  inputType?: string;
  tooltip?: string;
};
