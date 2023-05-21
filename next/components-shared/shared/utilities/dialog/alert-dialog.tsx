import { AiOutlineQuestion, AiOutlineQuestionCircle } from "react-icons/ai";
import { BiCheckCircle, BiError, BiInfoCircle, BiXCircle } from "react-icons/bi";
import { Button } from "../form/button";
import { Dialog } from "./dialog";

export enum AlertTypes {
  success = "success",
  error = "error",
  info = "info",
  warn = "warn",
  question = "question",
}

export function AlertDialog({
  type,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onClose,
  title,
  content,
  ...props
}: {
  isOpen: boolean;
  type: AlertTypes;
  title: string;
  content?: any;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: (params?: any) => void;
  onClose: (params?: any) => void;
}) {
  const icons = {
    info: <BiInfoCircle />,
    success: <BiCheckCircle />,
    error: <BiXCircle />,
    warn: <BiError />,
    question: <AiOutlineQuestionCircle />,
  };

  const iconColors = {
    info: "info",
    success: "success",
    error: "danger",
    warn: "warning",
    question: "primary",
  };

  const onCancelClick = () => {
    onClose();
  };

  const onConfirmClick = async () => {
    if (onConfirm) await onConfirm();
  };

  return (
    <Dialog
      width="450px"
      dialogClass="relative bg-white shadow-md rounded m-auto p-5"
      isOpen={props.isOpen}
      onClose={onClose}
      mobileMode={false}
    >
      <div className="flex md:flex-col md:items-center mt-2">
        <i className={`text-5xl opacity-75 text-${iconColors[type]}`}>{icons[type]}</i>
        <div className="pt-0 pl-3 md:pt-2 md:pl-0 text-left md:text-center">
          <h3 className="text-gray-800 font-semibold text-xl mb-1">{title}</h3>
          <p className="text-gray-700 mb-4">{content}</p>
        </div>
      </div>
      <div className="flex justify-end mt-4 p-2 -mb-5 -mx-5 border-t border-gray-200">
        {[AlertTypes.question, AlertTypes.warn].includes(type) && (
          <Button
            className="btn-large px-8 mr-2"
            large
            hoverDarken
            onClick={onCancelClick}
            text={cancelText}
          />
        )}
        <Button
          className="btn-large px-8"
          primary={type === AlertTypes.question}
          info={type === AlertTypes.info}
          warning={type === AlertTypes.warn}
          success={type === AlertTypes.success}
          danger={type === AlertTypes.error}
          text={confirmText}
          asyncLoading
          onClick={onConfirmClick}
        />
      </div>
    </Dialog>
  );
}
