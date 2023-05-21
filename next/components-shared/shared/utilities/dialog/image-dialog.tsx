import { CSSProperties } from "react";
import { Dialog } from "./dialog";

export function ImageDialog({
  ...props
}: {
  isOpen: boolean;
  image: string;
  onClose: Function;
  className?: string;
  style?: CSSProperties;
  children?: any;
}) {
  return (
    <Dialog
      isOpen={props.isOpen}
      onClose={props.onClose}
      onOverlayClick={props.onClose}
      mobileMode={false}
    >
      <img
        style={{ maxWidth: "86vw" }}
        src={props.image || "/assets/img/default.png"}
        onError={(e) => {
          (e.target as any).src = "/assets/img/default.png";
        }}
      />
    </Dialog>
  );
}
