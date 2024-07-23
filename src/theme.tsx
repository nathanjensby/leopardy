import type { Theme } from "theme-ui";
import "./App.css";
import "@fontsource/roboto";

export const theme: Theme = {
  fonts: {
    body: "system-ui, sans-serif",
    heading: '"Geopardy", sans-serif',
    monospace: "Menlo, monospace",
    primary: "Roboto, sans-serif",
  },
  colors: {
    text: "#fff",
    background: "#000",
    primary: "#060CE9",
    secondary: "#FFCC00",
  },
  buttons: {
    dataTable: {
      width: "100%",
      minHeight: "100px",
      p: 2,
      overflow: "hidden",
      fontSize: "clamp(16px, 4vw, 42px)",
      fontWeight: 900,
      color: "secondary",
    },
    scoring: {
      border: "1px solid white",
    },
    playerActions: {
      m: 2,
      p: 2,
      width: "90px",
    },
  },
};
