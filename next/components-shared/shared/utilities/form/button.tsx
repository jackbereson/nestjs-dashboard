import { CSSProperties, useEffect, useState } from "react";
import { CgSpinner } from "react-icons/cg";

export function Button({
  className = "",
  style,
  iconPosition = "start",
  ...props
}: {
  className?: string;
  style?: CSSProperties;
  small?: boolean;
  large?: boolean;
  outline?: boolean;
  gray?: boolean;
  primary?: boolean;
  accent?: boolean;
  info?: boolean;
  success?: boolean;
  danger?: boolean;
  warning?: boolean;
  hoverDanger?: boolean;
  hoverDarken?: boolean;
  disabled?: boolean;
  submit?: boolean;
  icon?: JSX.Element;
  iconPosition?: "start" | "end";
  text?: JSX.Element | string;
  isLoading?: boolean;
  asyncLoading?: boolean;
  children?: any;
  onClick?: ((...args: any[]) => Promise<any>) | ((...args: any[]) => any);
}) {
  let buttonClass = "";
  if (props.outline) {
    buttonClass = "btn-outline";
    if (props.primary) buttonClass += " is-primary";
    else if (props.accent) buttonClass += " is-accent";
    else if (props.info) buttonClass += " is-info";
    else if (props.success) buttonClass += " is-success";
    else if (props.danger) buttonClass += " is-danger";
    else if (props.warning) buttonClass += " is-warning";
  } else {
    if (props.primary) buttonClass = "btn-primary";
    else if (props.accent) buttonClass = "btn-accent";
    else if (props.gray) buttonClass = "btn-gray";
    else if (props.info) buttonClass = "btn-info";
    else if (props.success) buttonClass = "btn-success";
    else if (props.danger) buttonClass = "btn-danger";
    else if (props.warning) buttonClass = "btn-warning";
    // else buttonClass = "btn-default";
  }

  let buttonSize = "";
  if (props.small) buttonSize = "btn-sm";
  else if (props.large) buttonSize = "btn-lg";

  let buttonType: "button" | "submit" = "button";
  if (props.submit) buttonType = "submit";

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(props.isLoading);
  }, [props.isLoading]);

  const onClick = () => {
    if (!props.onClick) return;

    if (props.asyncLoading) {
      if (loading) return;

      setLoading(true);
      (props.onClick() as Promise<any>).finally(() => {
        setLoading(false);
      });
    } else {
      props.onClick();
    }
  };

  return (
    <button
      className={`${buttonClass} ${props.hoverDanger ? "hover-danger" : ""} ${
        props.hoverDarken ? "hover-darken" : ""
      } ${buttonSize} ${
        iconPosition == "end" ? "flex-row-reverse" : ""
      } ${className}`.trim()}
      style={style}
      type={buttonType}
      onClick={onClick}
      disabled={loading || props.disabled}
    >
      {props.icon && (
        <>
          {loading ? (
            <i className="animate-spin">
              <CgSpinner />
            </i>
          ) : (
            <i className="transition-none">{props.icon}</i>
          )}
        </>
      )}
      {props.text && (
        <span
          className={`relative transform transition-transform ${
            !props.icon && loading ? "translate-x-2.5" : ""
          }`}
        >
          {!props.icon && loading && (
            <i className="transition animate-spin absolute -left-6">
              <CgSpinner />
            </i>
          )}
          {props.text}
        </span>
      )}
      {props.children}
    </button>
  );
}
