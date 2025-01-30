import { createContext } from "react";
import { IToastContext } from "../types/types";

export const ToastContext = createContext<IToastContext>({
  toasts: [],
  addToast: () => {},
  removeToast: () => {},
});
