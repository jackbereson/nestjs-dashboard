import { CSSProperties } from "react";

export function Label({ text, ...props }: {
  htmlFor?: string;
  text: string;
  className?: string;
  style?: CSSProperties;
  children?: any;
}) {
  return (
    <label {...props} className="block w-full text-gray-600 font-semibold pl-1 mb-1">
      {text}
    </label>
  );
}
