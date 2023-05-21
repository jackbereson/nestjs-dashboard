type LabelProps = {
  [x: string]: any;
  htmlFor?: string;
  text: string;
};
export function Label({ text, ...props }: LabelProps) {
  return (
    <label {...props} className="py-1 uppercase font-bold text-xs">
      {text}
    </label>
  );
}
