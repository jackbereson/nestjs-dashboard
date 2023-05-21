import Link from "next/link";
import { CSSProperties, useEffect, useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { classNames } from "../../../../lib/helpers/design";

export function ButtonLink({
  className = "",
  style,
  iconPosition = "start",
  href,
  ...props
}: {
  className?: string;
  href?: string;
  style?: CSSProperties;
  iconPosition?: "start" | "end";
  children?: any;
  text?: JSX.Element | string;
  isLoading?: boolean;
  small?: boolean;
  large?: boolean;
  outline?: boolean;
  rounded?: boolean;
  roundFull?: boolean;
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

  return href ? (
    <Link href={href}>
      <a
        className={classNames(
          buttonClass,
          props.hoverDanger ? "hover-danger" : "",
          props.hoverDarken ? "hover-darken" : "",
          buttonSize,
          props.rounded ? "rounded" : "",
          props.roundFull ? "rounded-full" : "",
          className
        )}
        style={style}
      >
        {props.text && (
          <span className={`relative transform transition-transform`}>
            {props.text}
          </span>
        )}
        {props.children}
      </a>
    </Link>
  ) : (
    <a
      className={classNames(
        buttonClass,
        props.hoverDanger ? "hover-danger" : "",
        props.hoverDarken ? "hover-darken" : "",
        buttonSize,
        className
      )}
      style={style}
    >
      {props.text && (
        <span className={`relative transform transition-transform`}>
          {props.text}
        </span>
      )}
      {props.children}
    </a>
  );
}
