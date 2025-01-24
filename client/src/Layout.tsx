import { ThemeUIProvider } from "theme-ui";
import { Routes, Route } from "react-router-dom";
import BuzzerPage from "./components/BuzzerPage"; // Buzzer component
import { theme } from "./theme";
import App from "./App";

const Layout = () => {
  return (
    <ThemeUIProvider theme={theme}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/buzzer" element={<BuzzerPage />} />
      </Routes>
    </ThemeUIProvider>
  );
};

export default Layout;
