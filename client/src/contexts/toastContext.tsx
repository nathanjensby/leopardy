import { createContext, useContext, ReactNode } from "react";
import { useToast, ToastType } from "../hooks/useToast";
import Toast from "../components/Toast";
import { Box } from "theme-ui";

interface ToastContextProps {
  addToast: (message: string, type?: ToastType, duration?: number) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const useToastContext = (): ToastContextProps => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToastContext must be used within a ToastProvider");
  }
  return context;
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const { toasts, addToast, removeToast } = useToast();

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <Box
        sx={{
          position: "fixed",
          top: 10,
          right: 10,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          zIndex: 1000,
        }}
      >
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} removeToast={removeToast} />
        ))}
      </Box>
    </ToastContext.Provider>
  );
};
