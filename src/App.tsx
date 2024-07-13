import "./App.css";
import Splash from "./components/Splash";
import { useReducer } from "react";
import GameBoard from "./components/GameBoard";
import { PlayersContext } from "./contexts/playersContext";
import { playersReducer } from "./reducers/playersReducer";
import { GAME_STATE_ACTION_TYPES, IGameState, IState } from "./types/types";
import { gameStateReducer } from "./reducers/gameStateReducer";
import { GameContext } from "./contexts/gameContext";
import Results from "./components/Results";

function App() {
  const playersInitialState: IState = { players: [] };
  const gameInitialState: IGameState = {
    gameState: GAME_STATE_ACTION_TYPES.START,
  };

  const [playersState, playersDispatch] = useReducer(
    playersReducer,
    playersInitialState
  );
  const [gameState, gameDispatch] = useReducer(
    gameStateReducer,
    gameInitialState
  );

  return (
    <GameContext.Provider value={[gameState, gameDispatch]}>
      <PlayersContext.Provider value={[playersState, playersDispatch]}>
        {gameState.gameState === GAME_STATE_ACTION_TYPES.START && <Splash />}
        {gameState.gameState === GAME_STATE_ACTION_TYPES.SINGLE_LEOPARDY && (
          // pass in single leopardy data
          <GameBoard />
        )}
        {gameState.gameState === GAME_STATE_ACTION_TYPES.DOUBLE_LEOPARDY && (
          // pass in double leopardy data
          <GameBoard />
        )}
        {gameState.gameState === GAME_STATE_ACTION_TYPES.FINAL_LEOPARDY && (
          // pass in final leopardy data
          <GameBoard />
        )}
        {gameState.gameState === GAME_STATE_ACTION_TYPES.RESULTS && <Results />}
      </PlayersContext.Provider>
    </GameContext.Provider>
  );
}

export default App;
