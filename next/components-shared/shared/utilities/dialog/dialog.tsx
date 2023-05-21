import { Children, Fragment, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import useDevice from "../../../../hooks/use-device";
import useScrollBlock from "../../../../hooks/use-scroll-block";
import { HiOutlineX } from "react-icons/hi";

const ROOT_ID = "dialog-root";
export function Dialog({
  wrapperClass = "fixed w-screen h-screen top-0 left-0 z-100 flex flex-col overflow-y-scroll py-10",
  overlayClass = "fixed w-full h-full top-0 left-0 pointer-events-none",
  dialogClass = "relative bg-white shadow-md rounded m-auto",
  headerClass = "relative flex justify-between p-4 py-2 box-content bg-white z-10 border-b border-gray-300 rounded-t",
  bodyClass = "relative p-4 py-2 bg-white rounded",
  footerClass = "relative flex justify-end p-4 pb-3 pt-2 bg-white z-10 border-t border-gray-3 rounded-b",
  mobileMode = true,
  width = "auto",
  maxWidth = "86vw",
  title = "",
  icon = null,
  onOverlayClick,
  ...props
}: {
  wrapperClass?: string;
  overlayClass?: string;
  dialogClass?: string;
  headerClass?: string;
  bodyClass?: string;
  footerClass?: string;
  title?: string;
  icon?: JSX.Element;
  width?: string;
  maxWidth?: string;
  mobileMode?: boolean;
  isOpen: boolean;
  onClose: Function;
  children?: any;
  onOverlayClick?: Function;
}) {
  const { isMobile, isSSR } = useDevice();
  if (isSSR) return null;

  const [isOpen, setIsOpen] = useState(props.isOpen);
  let isClickingOverlay = false;

  useEffect(() => {
    if (props.isOpen) {
      setIsOpen(props.isOpen);
    } else {
      setTimeout(() => {
        setIsOpen(props.isOpen);
      }, 200);
    }
  }, [props.isOpen]);

  useScrollBlock({ rootId: ROOT_ID, dependencies: [isOpen] });

  let header = Children.map(props.children, (child) =>
    child.type?.displayName === "Header" ? child : null
  );
  let body = Children.map(props.children, (child) =>
    child.type?.displayName === "Body" ? child : null
  );
  let footer = Children.map(props.children, (child) =>
    child.type?.displayName === "Footer" ? child : null
  );
  let children = Children.map(props.children, (child) => (!child.type?.displayName ? child : null));

  if (title && !header.length) {
    header = [
      <Fragment key={0}>
        <div className="flex items-center">
          {icon ? <i className="text-24 text-primary mr-2">{icon}</i> : null}
          <span className="text-gray-700 text-lg font-semibold">{title}</span>
        </div>
        <button className="btn-default transform translate-x-4" onClick={() => props.onClose()}>
          <i className="text-24">
            <HiOutlineX />
          </i>
        </button>
      </Fragment>,
    ];
  }

  let el = (
    <div
      className={`dialog-wrapper ${wrapperClass} ${mobileMode && isMobile ? "mobile" : ""}`}
      onMouseDown={() => (isClickingOverlay = true)}
      onMouseUp={() => {
        if (isClickingOverlay) {
          onOverlayClick && onOverlayClick();
          isClickingOverlay = false;
        }
      }}
    >
      <div
        className={`dialog-overlay ${overlayClass} ${
          props.isOpen ? "animate-emerge" : "animate-fade"
        }`}
        style={{
          backgroundColor: props.isOpen ? "rgba(0,0,0,.32)" : "rgba(0,0,0,0)",
        }}
      ></div>
      <div
        className={`dialog ${dialogClass} ${
          props.isOpen
            ? mobileMode && isMobile
              ? "animate-slide-up"
              : "animate-scale-up"
            : mobileMode && isMobile
            ? "animate-slide-down"
            : "animate-scale-down"
        }`}
        style={{ width, maxWidth }}
        onMouseDown={(e) => {
          e.stopPropagation();
          isClickingOverlay = false;
        }}
        onMouseUp={(e) => {
          e.stopPropagation();
          isClickingOverlay = false;
        }}
      >
        {header?.length ? <div className={`dialog-header ${headerClass}`}>{header}</div> : null}
        {body?.length ? <div className={`dialog-body ${bodyClass}`}>{body}</div> : null}
        {children}
        {footer?.length ? <div className={`dialog-footer ${footerClass}`}>{footer}</div> : null}
      </div>
    </div>
  );

  return isOpen ? createPortal(el, document.getElementById(ROOT_ID)) : null;
}

const Header = ({ children }) => children;
Header.displayName = "Header";
Dialog.Header = Header;

const Body = ({ children }) => children;
Body.displayName = "Body";
Dialog.Body = Body;

const Footer = ({ children }) => children;
Footer.displayName = "Footer";
Dialog.Footer = Footer;
