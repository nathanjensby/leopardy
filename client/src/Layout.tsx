import { ThemeUIProvider } from "theme-ui";
import { Routes, Route } from "react-router-dom";
import BuzzerPage from "./components/BuzzerPage"; // Buzzer component
import HostKey from "./components/HostKey";
import { theme } from "./theme";
import App from "./App";
import { ToastProvider } from "./contexts/toastProvider";

const Layout = () => {
  return (
    <ThemeUIProvider theme={theme}>
      <ToastProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/buzzer" element={<BuzzerPage />} />
          <Route path="/key" element={<HostKey />} />
        </Routes>
      </ToastProvider>
    </ThemeUIProvider>
  );
};

export default Layout;
