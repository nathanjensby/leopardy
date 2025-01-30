import { Box } from "theme-ui";
import { IToast } from "../types/types";

interface ToastProps {
  toast: IToast;
  removeToast: (id: number) => void;
}

const Toast: React.FC<ToastProps> = ({ toast, removeToast }) => {
  return (
    <Box
      sx={{
        variant: `alerts.${toast.type}`,
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
