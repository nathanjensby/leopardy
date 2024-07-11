import { ThemeUIProvider } from "theme-ui";
import { theme } from "./theme";
import "./App.css";
import Splash from "./components/Splash";
import { useState } from "react";
import GameBoard from "./components/GameBoard";

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <ThemeUIProvider theme={theme}>
      {isPlaying ? (
        <GameBoard setIsPlaying={setIsPlaying} />
      ) : (
        <Splash setIsPlaying={setIsPlaying} />
      )}
    </ThemeUIProvider>
  );
}

export default App;
