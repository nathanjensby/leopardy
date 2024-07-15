import type { Theme } from "theme-ui";
import "@fontsource/roboto";

export const theme: Theme = {
  fonts: {
    body: "system-ui, sans-serif",
    heading: '"Avenir Next", sans-serif',
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
      fontSize: [52],
      fontWeight: 900,
      color: "secondary",
    },
    scoring: {
      border: "1px solid white",
    },
  },
};
