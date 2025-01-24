import { createContext } from "react";
import {
  GAME_STATE_ACTION_TYPES,
  GameStateActionTypes,
  IGameState,
} from "../types/types";
export const GameContext = createContext<
  [IGameState, React.Dispatch<GameStateActionTypes>]
>([{ gameState: GAME_STATE_ACTION_TYPES.START }, () => {}]);
