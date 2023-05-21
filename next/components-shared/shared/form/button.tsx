type ButtonProps = {
  style?: string;
  primary?: boolean;
  secondary?: boolean;
  danger?: boolean;
  warning?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: (e) => void;
  children?: any;
};
export function Button({ onClick, ...props }: ButtonProps) {
  const primary = props.primary && "text-white bg-primary hover:bg-primary-dark ";
  const secondary = props.secondary && "text-white bg-accent hover:bg-accent-dark ";
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        if (onClick) onClick(e);
      }}
      className={
        "inline-flex justify-center text-center text-sm py-2 px-4 border border-transparent shadow-sm rounded-md focus:outline-none " +
        (props.primary && primary) +
        (props.secondary && secondary)
      }
    >
      {props.children}
    </button>
  );
}
