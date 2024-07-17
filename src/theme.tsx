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
      p: 2,
      fontSize: [52],
      fontWeight: 900,
      color: "secondary",
      overflow: "hidden",
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
