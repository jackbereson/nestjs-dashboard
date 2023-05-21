import { createContext, useContext, useState } from "react";
import { AlertDialog, AlertTypes } from "../components-shared/shared/utilities/dialog/alert-dialog";

const AlertContext = createContext<
  Partial<{
    info: (title: string, content?: string, confirm?: string) => any;
    success: (title: string, content?: string, confirm?: string) => any;
    error: (title: string, content?: string, confirm?: string) => any;
    warn: (
      title: string,
      content?: string,
      confirm?: string,
      confirmFn?: (() => Promise<boolean>) | (() => boolean)
    ) => Promise<boolean>;
    question: (
      title: string,
      content?: string,
      confirm?: string,
      confirmFn?: (() => Promise<boolean>) | (() => boolean)
    ) => Promise<boolean>;
  }>
>(null);

let interval = null;
let confirmed = undefined;
let confirmFn = null;
export function AlertProvider({ children }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<AlertTypes>();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [confirm, setConfirm] = useState("");

  const alert = {
    info: (title: string, content: string = "", confirm?: string) => {
      openAlert("info", title, content);
    },
    success: (title: string, content: string = "", confirm?: string) => {
      openAlert("success", title, content);
    },
    error: (title: string, content: string = "", confirm?: string) => {
      openAlert("error", title, content);
    },
    warn: (
      title: string,
      content: string = "",
      confirm?: string,
      confirmFn?: (() => Promise<boolean>) | (() => boolean)
    ) => {
      openAlert("warn", title, content, confirm, confirmFn);
      return new Promise<boolean>((resolve) => {
        interval = setInterval(() => {
          if (confirmed !== undefined) {
            clearInterval(interval);
            resolve(confirmed);
            confirmed = undefined;
          }
        }, 50);
      });
    },
    question: (
      title: string,
      content: string = "",
      confirm?: string,
      confirmFn?: (() => Promise<boolean>) | (() => boolean)
    ) => {
      openAlert("question", title, content, confirm, confirmFn);
      return new Promise<boolean>((resolve) => {
        interval = setInterval(() => {
          if (confirmed !== undefined) {
            clearInterval(interval);
            resolve(confirmed);
            confirmed = undefined;
          }
        }, 50);
      });
    },
  };

  const openAlert = (
    type: any,
    title: string,
    content: string,
    confirm?: string,
    confirmFnParam?: Function
  ) => {
    confirmFn = confirmFnParam || null;
    clearInterval(interval);
    setTitle(title);
    setContent(content);
    setConfirm(confirm);
    setType(type);
    setIsOpen(true);
  };

  const onConfirm = async () => {
    confirmed = true;
    if (confirmFn) {
      let res = await confirmFn();
      if (res) setIsOpen(false);
    } else {
      setIsOpen(false);
    }
  };

  const onClose = () => {
    confirmed = false;
    setIsOpen(false);
  };

  return (
    <AlertContext.Provider value={alert}>
      {children}
      <AlertDialog
        type={type}
        title={title}
        content={content}
        confirmText={confirm}
        isOpen={isOpen}
        onConfirm={onConfirm}
        onClose={onClose}
      />
    </AlertContext.Provider>
  );
}

export const useAlert = () => useContext(AlertContext);
