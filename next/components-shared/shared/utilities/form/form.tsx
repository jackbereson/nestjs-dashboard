import { CSSProperties, FormEvent, MutableRefObject, useEffect, useRef } from "react";

export function Form({
  className = "",
  style,
  ...props
}: {
  id?: string;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => any;
  onChange?: (form: HTMLFormElement, event: Event) => any;
  className?: string;
  style?: CSSProperties;
  children?: any;
}) {
  const ref: MutableRefObject<HTMLFormElement> = useRef();

  useEffect(() => {
    ref.current.addEventListener("change", props.onChange as any);
    return () => {
      ref.current?.removeEventListener("change", props.onChange as any);
    };
  }, []);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (props.onSubmit) props.onSubmit(e);
  };

  return (
    <form
      ref={ref}
      className={className}
      style={style}
      id={props.id}
      onSubmit={(e) => onSubmit(e)}
    >
      {props.children}
    </form>
  );
}
