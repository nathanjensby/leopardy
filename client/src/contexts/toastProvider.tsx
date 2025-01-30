import { createContext, useContext, ReactNode } from "react";
import { useToast } from "../hooks/useToast";
import Toast from "../components/Toast";
import { Box } from "theme-ui";

export const ToastContext = createContext<
  ReturnType<typeof useToast> | undefined
>(undefined);

export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToastContext must be used within a ToastProvider");
  }
  return context;
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const { toasts, addToast, removeToast } = useToast();

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      {/* Toast Container */}
      <Box
        sx={{
          position: "fixed",
          top: 4,
          right: 4,
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
