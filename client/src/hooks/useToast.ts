import { useState } from "react";
import { IToast, ToastType } from "../types/types";

export const useToast = () => {
  const [toasts, setToasts] = useState<IToast[]>([]);

  const addToast = (
    message: string,
    type: ToastType = "info",
    duration: number = 3000
  ) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), duration);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return {
    toasts,
    addToast,
    removeToast,
  };
};
