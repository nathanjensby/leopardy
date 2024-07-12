import { ThemeUIProvider } from "theme-ui";
import { theme } from "./theme";
import App from "./App";

const Layout = () => {
  return (
    <ThemeUIProvider theme={theme}>
      <App />
    </ThemeUIProvider>
  );
};

export default Layout;
