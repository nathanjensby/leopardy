import { GAME_STATE_ACTION_TYPES, IGameState } from "../types/types";

export function gameStateReducer(
  state: IGameState,
  action: { type: GAME_STATE_ACTION_TYPES }
): IGameState {
  if (action.type) {
    return { ...state, gameState: action.type };
  } else {
    throw Error("Missing type: " + action);
  }
}
