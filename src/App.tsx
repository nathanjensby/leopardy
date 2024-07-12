import "./App.css";
import Splash from "./components/Splash";
import { useReducer, useState } from "react";
import GameBoard from "./components/GameBoard";
import { PlayersContext } from "./contexts/playersContext";
import { playersReducer } from "./reducers/playersReducer";
import { IState } from "./types/types";

function App() {
  const initialState: IState = { players: [] };

  const [state, dispatch] = useReducer(playersReducer, initialState);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <PlayersContext.Provider value={[state, dispatch]}>
      {isPlaying ? (
        <GameBoard setIsPlaying={setIsPlaying} />
      ) : (
        <Splash setIsPlaying={setIsPlaying} />
      )}
    </PlayersContext.Provider>
  );
}

export default App;
