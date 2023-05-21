import { createContext, ReactText, useContext } from "react";
import {
  ToastContainer,
  toast as toastify,
  ToastContent,
  ToastOptions,
  Slide,
} from "react-toastify";

const ToastContext = createContext<{
  default: (
    content: ToastContent,
    options?: ToastOptions | undefined
  ) => React.ReactText;
  info: (
    content: ToastContent,
    options?: ToastOptions | undefined
  ) => React.ReactText;
  success: (
    content: ToastContent,
    options?: ToastOptions | undefined
  ) => React.ReactText;
  error: (
    content: ToastContent,
    options?: ToastOptions | undefined
  ) => React.ReactText;
  warn: (
    content: ToastContent,
    options?: ToastOptions | undefined
  ) => React.ReactText;
  dark: (
    content: ToastContent,
    options?: ToastOptions | undefined
  ) => React.ReactText;
}>(null);

const ToastProvider = ({ children }: any) => {
  const defaultOptions: ToastOptions = {
    autoClose: 2500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    pauseOnFocusLoss: true,
    position: toastify.POSITION.BOTTOM_CENTER,
  };

  const toast = {
    default: (content: string, options?: ToastOptions) =>
      toastify(content, { ...defaultOptions, ...options }),
    info: (content: string, options?: ToastOptions) =>
      toastify.info(content, { ...defaultOptions, ...options }),
    success: (content: string, options?: ToastOptions) =>
      toastify.success(content, { ...defaultOptions, ...options }),
    error: (content: string, options?: ToastOptions) =>
      toastify.error(content, { ...defaultOptions, ...options }),
    warn: (content: string, options?: ToastOptions) =>
      toastify.warn(content, { ...defaultOptions, ...options }),
    dark: (content: string, options?: ToastOptions) =>
      toastify.dark(content, { ...defaultOptions, ...options }),
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <ToastContainer newestOnTop limit={5} transition={Slide} />
    </ToastContext.Provider>
  );
};

export default ToastProvider;

export const useToast = () => useContext(ToastContext);
