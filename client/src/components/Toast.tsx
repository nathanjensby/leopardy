import { Box } from "theme-ui";
import { Toast as ToastType } from "../hooks/useToast";

interface ToastProps {
  toast: ToastType;
  removeToast: (id: number) => void;
}

const Toast: React.FC<ToastProps> = ({ toast, removeToast }) => {
  return (
    <Box
      sx={{
        bg:
          toast.type === "success"
            ? "green.500"
            : toast.type === "error"
            ? "red.500"
            : "blue.500",
        color: "white",
        padding: 3,
        borderRadius: "md",
        boxShadow: "md",
        cursor: "pointer",
        transition: "transform 0.2s ease, opacity 0.2s ease",
        ":hover": {
          transform: "scale(1.05)",
          opacity: 0.9,
        },
      }}
      onClick={() => removeToast(toast.id)}
    >
      {toast.message}
    </Box>
  );
};

export default Toast;
