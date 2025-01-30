import type { Theme } from "theme-ui";
import "./App.css";
import "@fontsource/roboto";

export const theme: Theme = {
  fonts: {
    body: "system-ui, sans-serif",
    heading: '"Geopardy", sans-serif',
    monospace: "Menlo, monospace",
    primary: "Roboto, sans-serif",
    card: "Korinna, serif",
  },
  colors: {
    text: "#fff",
    background: "#000",
    primary: "#060CE9",
    secondary: "#FFCC00",
    success: "#4CAF50",
    warn: "#FFEB3B",
    error: "#F44336",
    successLight: "#A5D6A7",
    warnLight: "#FFF59D",
    errorLight: "#EF9A9A",
  },
  alerts: {
    success: {
      bg: "successLight",
      border: "2px solid",
      borderColor: "success",
      color: "background",
    },
    warn: {
      bg: "warnLight",
      border: "2px solid",
      borderColor: "warn",
      color: "background",
    },
    error: {
      bg: "errorLight",
      border: "2px solid",
      borderColor: "error",
      color: "background",
    },
    info: {
      bg: "primary",
      border: "2px solid",
      borderColor: "secondary",
      color: "background",
    },
  },
  buttons: {
    dataTable: {
      width: "100%",
      minHeight: "100px",
      p: 2,
      overflow: "hidden",
      fontSize: "clamp(16px, 3vw, 58px)",
      fontWeight: 900,
      color: "secondary",
      textAlign: "center",
    },
    scoring: {
      px: 3,
      py: 2,
      border: (theme) => `1px solid ${theme.colors!.text}`,
      borderRadius: 6,
    },
    playerActions: {
      m: 2,
      p: 2,
      width: "90px",
    },
  },
};
